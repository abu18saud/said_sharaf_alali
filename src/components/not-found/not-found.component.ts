import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  searchQuery = '';
  showNoResults = false;
  currentIcon = '';

  icons = [
    '<svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 9L9 15" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9L15 15" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H16" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V12V16" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V12L15 15" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ];

  onSearch() {
    // Add shake animation
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.classList.add('search-shake');
      setTimeout(() => {
        searchInput.classList.remove('search-shake');
      }, 500);
    }

    // Simulate search
    setTimeout(() => {
      if (this.searchQuery.trim() === '') {
        this.showNoResults = false;
      } else {
        this.showNoResults = true;
        this.currentIcon = this.icons[Math.floor(Math.random() * this.icons.length)];
      }
    }, 1000);
  }
}
