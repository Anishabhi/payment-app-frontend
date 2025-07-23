Payment App - Frontend
This is the React Native frontend of the Payment App.
It allows customers to view their loan details, make payments, and check payment history.
The app communicates with the backend Node.js server using REST APIs.

Features--

View a list of customers with loan details:
Account Number

Customer Name

Issue Date

Interest Rate

Tenure

EMI Due

Make a payment for a specific account.

View payment history for any account.

Works with the Payment App Backend (Node.js + MySQL).


Project Structure--

PaymentApp/
│
├── App.tsx          Main React Native component
├── package.json      Dependencies
├── node_modules/     Installed npm packages


Prerequisites--

Node.js (>= 16.x)

npm or yarn

React Native CLI

Android Studio or a physical Android device

Payment App Backend (running on port 5000)


Clone the repository:

git clone https://github.com/Anishabhi/payment-app-frontend.git
cd payment-app-frontend


install dependencies:

npm install

Start the Metro bundler:

npx react-native start

In another terminal, build and run the app:

npx react-native run-android


