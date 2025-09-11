/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* 
* 수정 버전 - 사용자 HTML 구조에 맞게 조정
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    
    if (selectHeader.classList.contains('fixed-top')) {
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      navbar.classList.toggle('navbar-mobile');
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
    }
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navlink => {
    navlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Smooth scrolling for anchor links
   */
  document.querySelectorAll('a.scrollto').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.hash !== "") {
        const target = document.querySelector(this.hash);
        if (target) {
          e.preventDefault();
          const header = document.querySelector('#header');
          const offset = header ? header.offsetHeight : 80;
          
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Back to top button (원래는 scroll-top이지만 HTML에서는 back-to-top 사용)
   */
  let scrollTop = document.querySelector('.back-to-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Portfolio filtering (기존 isotope 대신 간단한 필터링)
   */
  const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (portfolioFilters.length > 0) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all filters
        portfolioFilters.forEach(f => f.classList.remove('filter-active'));
        
        // Add active class to clicked filter
        this.classList.add('filter-active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === '*') {
            item.style.display = 'block';
          } else {
            if (item.classList.contains(filterValue.substring(1))) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          }
        });
        
        // Reinit AOS after filtering
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      });
    });
  }

  /**
   * Initiate glightbox (라이브러리가 있는 경우에만)
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init swiper sliders (라이브러리가 있는 경우에만)
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
        new Swiper(swiperElement, config);
      });
    }
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter (라이브러리가 있는 경우에만)
   */
  window.addEventListener('load', () => {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const header = document.querySelector('#header');
          const offset = header ? header.offsetHeight : 80;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navbar Scrollspy (navmenu 대신 navbar 사용)
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarScrollspy() {
    navbarlinks.forEach(navlink => {
      if (!navlink.hash) return;
      let section = document.querySelector(navlink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('#navbar a.active').forEach(link => link.classList.remove('active'));
        navlink.classList.add('active');
      } else {
        navlink.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('load', navbarScrollspy);
  document.addEventListener('scroll', navbarScrollspy);

})();
