# Conestoga Computer Science Club Sign-In Client
This is the Angular-based web client for the Conestoga Computer Science Club's sign-in and attendance tracking service.

See the README for the web service for details on it.

## Requirements
- Yarn or NPM
  - Angular CLI

## Testing

### Setting Up
Change the hard-coded API host strings (`BASE_URL`) in [AuthService](/src/app/services/auth.service.ts) and [UserService](/src/app/services/user.service.ts) to match your development instance of the web service.

Install the required dependencies:
```
yarn install //or npm install
```

Run the application (default is port 4200):
```
ng serve
```

### Usage
All basic functionality exists, but the UI itself is still a work in progress. 

Navigate to `/scan` to test the QR code scanning. 
No UI navigation feature to reach this page has been added yet.