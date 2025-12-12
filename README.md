# Shopping List App

![Status](https://img.shields.io/badge/status-stable-green)
![Version](https://img.shields.io/badge/version-1.1.0-blue)

A full-stack shopping list application built with vanilla JavaScript and Firebase, featuring real-time data synchronization, user authentication, and comprehensive CRUD operations.

## 🎉 Version 1.1.0 Release Notes

### New Features
- **✅ Complete Edit Functionality**: Users can now edit items inline with full Edit/Save/Cancel workflow
- **Dynamic State Management**: Edit mode tracked via `data-edit-mode` attribute
- **Improved UX**: Delete button hidden during edit mode to prevent accidental deletions
- **Timestamp Updates**: Edited items now update timestamps in the database
- **Google Sign-In Branding**: Updated to meet Google's official branding guidelines

### Bug Fixes
- Fixed cancel button event listener scope issues
- Resolved UI state inconsistencies when canceling edits without changes
- Corrected double-click requirement bug in cancel functionality

## 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ryanbcommits/shopping-list-app.git
   cd shopping-list-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   
4. Run Development server
   ```bash
   npx vite
   ```

Then open your browser to the localhost URL that Vite provides (usually `http://localhost:5173`).

## 🚀 Live Demo

The app is deployed at: [https://app.ryanbcommits.com](https://app.ryanbcommits.com)

**Current Status:** Production-Ready (v1.1.0)
- ✅ HTTPS/SSL certificate active
- ✅ Full CRUD operations implemented
- ✅ Mobile compatibility tested
- ✅ Environment variables secured

## ✨ Features

### Core Functionality
- **User Authentication**: Email/Password and Google Sign-In
- **Real-time Sync**: Shopping list items sync across devices via Firestore
- **Full CRUD Operations**: 
  - Create new items
  - Read/display items
  - Update/edit existing items (NEW in v1.1.0!)
  - Delete items (soft delete)
- **Security Features**:
  - Session timeout after 15 minutes of inactivity
  - Rate limiting to prevent spam
  - XSS protection via textContent sanitization
  - Password validation with complexity requirements

### User Experience
- **Inline Editing**: Click Edit to modify items without leaving the list
- **Visual Feedback**: Loading states, error messages, and success indicators
- **Keyboard Support**: Enter key to add items
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: All data saved to cloud, survives logout/login

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Firebase (Authentication & Firestore)
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📚 Key Learnings

### Recent Development (v1.1.0)
- **State Management**: Single source of truth using `data-edit-mode` attribute
- **Event Listener Scope**: Importance of defining listeners at component creation level
- **UI State Coordination**: Managing visibility of multiple elements based on editing state
- **Database Updates**: Using `updateDoc()` for partial updates with timestamp refresh

### JavaScript Mastery
- Event listeners and DOM manipulation
- Async/await with Firebase operations
- Function scope and hoisting
- Element visibility control
- Attribute manipulation for state tracking

### Firebase Skills
- Authentication flow (Email/Password + OAuth)
- Firestore CRUD operations
- User-specific data organization
- Soft delete patterns for data recovery

## 📋 Development Roadmap

### ✅ Completed (v1.1.0)
- User authentication system
- Add items functionality
- Delete items (soft delete)
- Data persistence
- Rate limiting & security
- **Edit/Update items with full Save/Cancel workflow**
- Google Sign-In integration
- Production deployment with HTTPS

### 🔄 In Progress
- Input validation for special characters
- Enhanced mobile UI

### 📋 Planned Features
- Categories/tags for items
- Drag-and-drop reordering
- Shopping list sharing
- Quantity tracking
- Purchase history
- Offline mode support
- Progressive Web App (PWA) functionality

## 🐛 Known Issues
- [ ] Minor typo in code comments
- [ ] Firestore Security Rules need production hardening
- [ ] Special character validation pending implementation
- [ ] alert modal creates timeout error.

## 💡 AI Disclosure

This project uses Claude AI as a learning assistant, not as a code generator. My approach:

**Method:** Code-first development with AI assistance only when stuck on specific problems.

**How I Use AI:**
- As a tutor for complex concepts
- To debug error messages
- To learn best practices
- To understand API differences

**What's My Own Work:**
- All initial code attempts
- Project architecture decisions
- Problem-solving approaches
- Feature implementation


## 🙏 Acknowledgments

- Firebase documentation for excellent guides
- Claude AI for patient tutoring during roadblocks
- The JavaScript community for invaluable resources

## 📧 Contact

Ryan Burns - [GitHub](https://github.com/ryanbcommits)

---

**Last Updated:** December 2025 | **Version:** 1.1.0