interface ImageViewerOptions {
  zoomStep?: number;
  minZoom?: number;
  maxZoom?: number;
  enableKeyboard?: boolean;
}

interface ImageState {
  zoom: number;
  x: number;
  y: number;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  imageStartX: number;
  imageStartY: number;
}

export class ImageViewer {
  private options: Required<ImageViewerOptions>;
  private overlay: HTMLDivElement | null = null;
  private imageContainer: HTMLDivElement | null = null;
  private image: HTMLImageElement | null = null;
  private closeButton: HTMLDivElement | null = null;
  private controlsContainer: HTMLDivElement | null = null;
  private delegationHandler: ((e: Event) => void) | null = null;
  private dragHandler: ((e: MouseEvent) => void) | null = null;
  private mouseUpHandler: (() => void) | null = null;
  private animationFrameId: number | null = null;
  private pendingUpdate = false;
  private state: ImageState = {
    zoom: 1,
    x: 0,
    y: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    imageStartX: 0,
    imageStartY: 0,
  };

  constructor(options: ImageViewerOptions = {}) {
    this.options = {
      zoomStep: options.zoomStep || 0.2,
      minZoom: options.minZoom || 0.1,
      maxZoom: options.maxZoom || 5,
      enableKeyboard: options.enableKeyboard !== false,
    };

    this.addStyles();
    this.bindEvents();
  }

  // Open the image viewer overlay.
  open(src: string, alt = ''): void {
    this.createOverlay();
    this.createImage(src, alt);
    this.resetState();
    document.body.style.overflow = 'hidden';
  }

  // Close the viewer and clean up listeners.
  close(): void {
    if (this.overlay) {
      // Remove drag listeners.
      this.cleanupDragEvents();

      // Remove global listeners.
      document.removeEventListener('mousemove', this.delegationHandler!);
      document.removeEventListener('mouseup', this.delegationHandler!);
      document.removeEventListener('keydown', this.delegationHandler!);
      document.removeEventListener('wheel', this.delegationHandler!);

      // Cancel any scheduled animation frame.
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }

      document.body.removeChild(this.overlay);
      this.overlay = null;
      this.image = null;
      this.imageContainer = null;
      this.closeButton = null;
      this.controlsContainer = null;
      this.delegationHandler = null;
      this.dragHandler = null;
      this.mouseUpHandler = null;
      this.pendingUpdate = false;
    }
    document.body.style.overflow = '';
  }

  // Create the fullscreen overlay container.
  private createOverlay(): void {
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(45, 45, 45, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: grab;
    `;

    // Close when clicking the backdrop.
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    this.createCloseButton();
    this.createControls();
    document.body.appendChild(this.overlay);
  }

  // Add the close button.
  private createCloseButton(): void {
    this.closeButton = document.createElement('div');
    this.closeButton.innerHTML = '×';
    this.closeButton.className = 'image-viewer-close-btn';
    this.closeButton.addEventListener('click', () => this.close());
    this.overlay!.appendChild(this.closeButton);
  }

  // Create zoom controls.
  private createControls(): void {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.style.cssText = `
      position: absolute;
      bottom: 40px;
      display: flex;
      gap: 12px;
      z-index: 10000;
    `;

    const controls = [
      { label: '+', onClick: () => this.zoomIn() },
      { label: '−', onClick: () => this.zoomOut() },
      { label: 'Reset', onClick: () => this.resetState() },
    ];

    controls.forEach(({ label, onClick }) => {
      const button = document.createElement('button');
      button.className = 'image-viewer-control-btn';
      button.textContent = label;
      button.addEventListener('click', onClick);
      this.controlsContainer!.appendChild(button);
    });

    this.overlay!.appendChild(this.controlsContainer);
  }

  private createImage(src: string, alt: string): void {
    this.imageContainer = document.createElement('div');
    this.imageContainer.style.cssText = `
      display: inline-flex;
      max-width: 90%;
      max-height: 90%;
      cursor: grab;
      transition: transform 0.1s ease-out;
    `;
    this.imageContainer.addEventListener('mousedown', (event) =>
      this.onMouseDown(event)
    );

    this.image = document.createElement('img');
    this.image.src = src;
    this.image.alt = alt;
    this.image.style.maxWidth = '100%';
    this.image.style.maxHeight = '100%';
    this.image.style.userSelect = 'none';
    this.image.style.pointerEvents = 'none';

    this.imageContainer.appendChild(this.image);
    this.overlay!.appendChild(this.imageContainer);
  }

  private bindEvents(): void {
    this.delegationHandler = (e: Event) => {
      if (e.type === 'mousemove') {
        const mouseEvent = e as MouseEvent;
        if (this.state.isDragging) {
          this.state.x =
            this.state.imageStartX + (mouseEvent.clientX - this.state.dragStartX);
          this.state.y =
            this.state.imageStartY + (mouseEvent.clientY - this.state.dragStartY);

          if (!this.pendingUpdate) {
            this.pendingUpdate = true;
            this.animationFrameId = requestAnimationFrame(() => {
              this.updateImageTransform();
              this.pendingUpdate = false;
            });
          }
        }
      } else if (e.type === 'mouseup') {
        this.state.isDragging = false;
        document.body.style.cursor = '';
      } else if (e.type === 'keydown' && this.options.enableKeyboard) {
        const keyboardEvent = e as KeyboardEvent;
        switch (keyboardEvent.key) {
          case '+':
          case '=':
            keyboardEvent.preventDefault();
            this.zoomIn();
            break;
          case '-':
            keyboardEvent.preventDefault();
            this.zoomOut();
            break;
          case '0':
            keyboardEvent.preventDefault();
            this.resetState();
            break;
        }
      } else if (e.type === 'wheel') {
        const wheelEvent = e as WheelEvent;
        wheelEvent.preventDefault();
        if (wheelEvent.deltaY < 0) {
          this.zoomIn();
        } else {
          this.zoomOut();
        }
      }
    };

    document.addEventListener('keydown', this.delegationHandler);
    document.addEventListener('wheel', this.delegationHandler, {
      passive: false,
    });
  }

  private onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.state.isDragging = true;
    this.state.dragStartX = event.clientX;
    this.state.dragStartY = event.clientY;
    this.state.imageStartX = this.state.x;
    this.state.imageStartY = this.state.y;
    document.body.style.cursor = 'grabbing';

    this.dragHandler = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      if (this.state.isDragging) {
        this.state.x =
          this.state.imageStartX + (moveEvent.clientX - this.state.dragStartX);
        this.state.y =
          this.state.imageStartY + (moveEvent.clientY - this.state.dragStartY);
        this.updateImageTransform();
      }
    };

    this.mouseUpHandler = () => {
      this.state.isDragging = false;
      document.body.style.cursor = '';
      this.cleanupDragEvents();
    };

    document.addEventListener('mousemove', this.dragHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  private cleanupDragEvents(): void {
    if (this.dragHandler) {
      document.removeEventListener('mousemove', this.dragHandler);
      this.dragHandler = null;
    }
    if (this.mouseUpHandler) {
      document.removeEventListener('mouseup', this.mouseUpHandler);
      this.mouseUpHandler = null;
    }
  }

  // Zoom in by one step.
  private zoomIn(): void {
    this.state.zoom = Math.min(
      this.state.zoom + this.options.zoomStep,
      this.options.maxZoom
    );
    this.updateImageTransform();
  }

  // Zoom out by one step.
  private zoomOut(): void {
    this.state.zoom = Math.max(
      this.state.zoom - this.options.zoomStep,
      this.options.minZoom
    );
    this.updateImageTransform();
  }

  // Reset zoom and position.
  private resetState(): void {
    this.state.zoom = 1;
    this.state.x = 0;
    this.state.y = 0;
    this.updateImageTransform();
  }

  // Apply the transform to the image container.
  private updateImageTransform(): void {
    if (!this.imageContainer) return;
    this.imageContainer.style.transform = `
      translate(${this.state.x}px, ${this.state.y}px) 
      scale(${this.state.zoom})
    `;
  }

  private styleElement: HTMLStyleElement | null = null;

  // Inject viewer styles once.
  private addStyles(): void {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.textContent = `
        .image-viewer-control-btn {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s;
          user-select: none;
        }
        
        .image-viewer-control-btn:hover {
          background: rgba(0, 0, 0, 0.4);
        }
        
        .image-viewer-close-btn {
          position: absolute;
          top: 20px;
          right: 30px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          z-index: 10001;
          user-select: none;
          width: 36px;
          height: 34px;
          display: flex;
          border-radius: 50%;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          transition: all 0.2s ease;
          line-height: 34px;
          padding-bottom:2px;
        }
        
        .image-viewer-close-btn:hover {
          background: rgba(0, 0, 0, 0.4);
        }
      `;
      document.head.appendChild(this.styleElement);
    }
  }

  // Remove injected styles.
  private removeStyles(): void {
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  // Tear down the viewer completely.
  destroy(): void {
    this.close();
    this.removeStyles();
  }
}
