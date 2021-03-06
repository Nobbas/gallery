import { Component, OnInit } from '@angular/core';
import { NbGalleryOptions, NbGalleryItem, NbGalleryAnimation } from 'nb-gallery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gallery';
  iconss = ['fas', 'arrow-circle-left'];
  galleryOptions: NbGalleryOptions[];
  galleryItems: NbGalleryItem[];

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "100%",
        height: "32.065rem",
        thumbnailsColumns: 4,
        itemAnimation: NbGalleryAnimation.Slide,
        itemPercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 1,
        thumbnailMargin: 1,
        preview: true,
        // itemArrowsAutoHide: true,
        itemSwipe: true,
        // thumbnailsArrowsAutoHide: true,
        previewSwipe: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        // arrowPrevIcon: ['fa', 'caret-left'],
        // arrowNextIcon: ['fa', 'caret-right'],
        // closeIcon: ['fas', 'times'],
        lazyLoading: true,
        previewCloseOnClick: true,
        defaultVideoThumbnnailUrl: "/assets/video-thumb.jpeg",
        previewZoom: true,
        previewFullscreen: true,
        previewForceFullscreen: true,
        previewAutoPlay: true,
        previewInfinityMove: true,
        fullWidth: true,
        itemAutoPlay: true,
        itemAutoPlayPauseOnHover: true,
        itemInfinityMove: true,
        itemBullets: true,
        thumbnailsSwipe: true,
        thumbnailsRemainingCount: true,
        previewAutoPlayPauseOnHover: true,
        previewRotate: true,
        previewDownload: true,
        previewBullets: true
      },
      // max-width 1199
      {
        breakpoint: 1199,
        width: "100%",
        height: "32rem",
        thumbnails: false,
        itemArrowsAutoHide: false,
        itemArrows: true
      },
      // max-width 768
      {
        breakpoint: 768,
        width: "100%",
        height: "25rem"
      },
      // max-width 425
      {
        breakpoint: 425,
        width: "100%",
        height: "14rem"
      }
    ];

    this.galleryItems = [
        {
          type: 'video',
          source: 'youtube',
          url: '8F0OCJ8GPUw'
        },
        {
          type: 'image',
          small: 'http://photos.listhub.net/CLAWCA/18343964/28?lm=20181204T013137',
          medium: 'http://photos.listhub.net/CLAWCA/18343964/28?lm=20181204T013137',
          big: 'http://photos.listhub.net/CLAWCA/18343964/28?lm=20181204T013137'
        },
        {
          type: 'image',
          small: 'http://photos.listhub.net/CLAWCA/18343964/27?lm=20181204T013137',
          medium: 'http://photos.listhub.net/CLAWCA/18343964/27?lm=20181204T013137',
          big: 'http://photos.listhub.net/CLAWCA/18343964/27?lm=20181204T013137'
        },
        {
          type: 'image',
          small: 'http://photos.listhub.net/CLAWCA/18343964/26?lm=20181204T013137',
          medium: 'http://photos.listhub.net/CLAWCA/18343964/26?lm=20181204T013137',
          big: 'http://photos.listhub.net/CLAWCA/18343964/26?lm=20181204T013137'
        },
        {
          type: 'image',
          small: 'http://photos.listhub.net/CLAWCA/18343964/25?lm=20181204T013137',
          medium: 'http://photos.listhub.net/CLAWCA/18343964/25?lm=20181204T013137',
          big: 'http://photos.listhub.net/CLAWCA/18343964/25?lm=20181204T013137'
        },
        {
          type: 'image',
          small: 'http://photos.listhub.net/CLAWCA/18343964/24?lm=20181204T013137',
          medium: 'http://photos.listhub.net/CLAWCA/18343964/24?lm=20181204T013137',
          big: 'http://photos.listhub.net/CLAWCA/18343964/24?lm=20181204T013137'
        },
        {
          type: 'image',
          small: 'http://photos.listhub.net/CLAWCA/18343964/20?lm=20181204T013137',
          medium: 'http://photos.listhub.net/CLAWCA/18343964/20?lm=20181204T013137',
          big: 'http://photos.listhub.net/CLAWCA/18343964/20?lm=20181204T013137'
        },
        {
          type: 'video',
          source: 'vimeo',
          url: '303959336'
        },
        {
          type: 'video',
          source: 'memory',
          url: 'http://blob.cbba.com/videos/listing/46409/hq/video.mp4'
        }
    ];
  }
}
