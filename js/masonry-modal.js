/*
    Copyright (c) 2025 Jakub Janecek
    All rights reserved.
    See copyright_rights_plan.txt for details.
*/
// Masonry modal gallery logic with improved style and animation
$(function () {
    const images = [
        'img/debbie_jump.JPG',
        'img/ffInternet_cable_electromagnetic.jpg',
        'img/ff_Internnet_cable_surrounded.jpg',
        'img/ff_javascript_code_screens_green.jpg',
        'img/ff_keyboard.jpg',
        'img/ff_web_development.jpg',
        'img/ff_web_development2.jpg',
        'img/Tropical_twist_sunny_blend_mango_pineapple.jpg'
    ];

    // Modal HTML with spinner
    const modalHtml = `
    <div class="modal fade" id="galleryModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content glass-section">
          <div class="modal-body p-0 position-relative">
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="d-flex justify-content-center align-items-center" style="min-height:400px;">
              <div id="modal-spinner" class="spinner-border text-primary position-absolute top-50 start-50 translate-middle" style="display:none;z-index:2;" role="status"><span class="visually-hidden">Loading...</span></div>
              <img id="modal-img" src="" alt="Gallery Image" class="img-fluid rounded shadow" style="max-height:70vh; max-width:100%; object-fit:contain; opacity:0; transform:scale(0.96); transition:opacity 0.4s, transform 0.4s;">
            </div>
            <button id="prev-img" type="button" class="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2 shadow"><i class="bi bi-chevron-left fs-3"></i></button>
            <button id="next-img" type="button" class="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2 shadow"><i class="bi bi-chevron-right fs-3"></i></button>
          </div>
        </div>
      </div>
    </div>
  `;
    $(document.body).append(modalHtml);

    let currentIndex = 0;

    function animateModalImage(src) {
        const $img = $('#modal-img');
        const $spinner = $('#modal-spinner');
        $spinner.show();
        $img.css({ opacity: 0, transform: 'scale(0.96)' });
        $img.one('load', function () {
            $spinner.hide();
            $img.css({ opacity: 1, transform: 'scale(1)' });
        });
        $img.attr('src', src);
    }

    function showModal(idx) {
        currentIndex = idx;
        animateModalImage(images[idx]);
        $('#galleryModal').modal('show');
    }

    $('.masonry-gallery .masonry-item img').each(function (i) {
        $(this).css({ 'cursor': 'pointer', 'transition': 'transform 0.3s, box-shadow 0.3s' });
        $(this).on('mouseenter', function () {
            $(this).css({ 'transform': 'translateY(-8px) scale(1.04)', 'box-shadow': '0 12px 32px rgba(31,38,135,0.18)' });
        });
        $(this).on('mouseleave', function () {
            $(this).css({ 'transform': '', 'box-shadow': '' });
        });
        $(this).on('click', function () {
            showModal(i);
        });
    });

    $('#prev-img').on('click', function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        animateModalImage(images[currentIndex]);
    });
    $('#next-img').on('click', function () {
        currentIndex = (currentIndex + 1) % images.length;
        animateModalImage(images[currentIndex]);
    });

    // Keyboard navigation
    $('#galleryModal').on('shown.bs.modal', function () {
        $(document).on('keydown.galleryModal', function (e) {
            if (e.key === 'ArrowLeft') $('#prev-img').click();
            if (e.key === 'ArrowRight') $('#next-img').click();
            if (e.key === 'Escape') $('#galleryModal').modal('hide');
        });
    });
    $('#galleryModal').on('hidden.bs.modal', function () {
        $(document).off('keydown.galleryModal');
        $('#modal-img').attr('src', '').css({ opacity: 0, transform: 'scale(0.96)' });
    });
});
