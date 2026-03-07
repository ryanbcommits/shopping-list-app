# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Known Issues
- Adding an item while a category filter is active appends it to the 
  visible list regardless of whether it matches the current filter
- User is not logged out after alotted time after hitting ok on the alert button.
- Session timeout alert does not reliably log the user out — clicking OK 
  on the alert triggers the document click listener, resetting the 
  inactivity timer. Needs a custom modal to fix properly.

## [1.2.0] - 2026-03-03

### Added
- Category system for shopping list items
- Category dropdown in add-item form (Dairy, Produce, Grocery, Meat, Frozen Food, Fish / Seafood)
- Category field saved to Firestore with each item
- Category badge displayed on each list item with color coding
- Category filter buttons generated dynamically from CATEGORIES array
- `currentFilter` state variable to track active category selection
- Category filter buttons dynamically filter the shopping list on click

### Changed
- Updated `saveItemToDatabase` function to accept category parameter
- Updated `addToList` function to display category data
- Updated `loadUserData` to pass category from Firestore to `addToList`
- Refactored `loadUserData()` into a three-stage collect → filter → display pipeline
- Stage 3 now renders from filtered array, not raw Firestore data



## [1.1.0] - 2025-12-11

### Added
- Complete inline edit functionality for shopping list items
- Edit/Save/Cancel workflow with proper state management
- Dynamic UI updates based on `data-edit-mode` attribute
- Timestamp updates when items are edited
- Cancel button that appears only during edit mode
- Google Sign-In button following official branding guidelines

### Changed
- Status badge updated from "beta" to "stable"
- Edit button now toggles between "Edit" and "Save" modes
- Delete button hidden during edit mode to prevent accidental deletions
- Improved event listener architecture (defined at component level)

### Fixed
- Cancel button event listener scope issues
- UI state inconsistencies when canceling without changes
- Double-click requirement bug in cancel functionality
- Edit mode state properly resets on cancel action

## [1.0.0] - 2025-08-27

### Added
- Initial production release
- User authentication (Email/Password)
- Google OAuth sign-in
- Shopping list CRUD operations (Create, Read, Delete)
- Real-time data synchronization with Firestore
- Soft delete functionality
- Rate limiting (1 second cooldown)
- Session timeout (15 minutes)
- XSS protection via textContent
- Password complexity validation
- HTTPS/SSL certificate
- Favicon

### Security
- Environment variables for Firebase config
- Input sanitization
- Session management
- Password policy enforcement

## [0.9.0-beta] - 2025-08-24

### Added
- First public beta deployment
- Core shopping list functionality
- Firebase integration
- Basic authentication flow

### Known Issues
- Mobile compatibility issues on iOS Chrome (resolved in 1.0.0)

## [0.1.0] - 2025-06-09

### Added
- Initial project setup
- Basic HTML structure
- Firebase connection testing
- DOMContentLoaded implementation

---

## Version History Summary

- **1.2.0** - Category system with filter buttons and collect → filter → display pipeline
- **1.1.0** - Full CRUD operations with inline editing
- **1.0.0** - First stable release with production deployment
- **0.9.0-beta** - Public beta with core features
- **0.1.0** - Initial development