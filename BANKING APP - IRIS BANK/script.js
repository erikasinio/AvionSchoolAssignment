"use strict";

// -------------DOM-------------
// LOGIN DOM
let btnLogin = document.querySelector(".btn-login");
let usernameLogin = document.querySelector("#username-login");
let passwordLogin = document.querySelector("#password-login");
let loginForm = document.querySelector(".login");

// NAVBAR DOM
let navbar = document.querySelector(".navbar");
let homeTab = document.querySelector(".home-tab");
let profileTab = document.querySelector(".profile-tab");
let btnNewAcc = document.querySelector(".new-account");

// ACCOUNTS CONTAINER DOM
let acctsContainer = document.querySelector(".accounts-container");
let usersTbody = document.querySelector("#users-table tbody");
let usersTableBody = document
  .querySelector("#users-table")
  .getElementsByTagName("tbody")[0];
//   FOR SOME REASON usersRows is not returning the items compared if you will use the document...
// let usersRows = document
//   .querySelector("#users-table")
//   .querySelectorAll("tbody tr");
let searchInput = document.querySelector("#search");

// ACCOUNTS PROFILE DOM
let profilePage = document.querySelector(".accounts-profile");
let profileName = document.querySelector(".sp-account-name");
let profileUsername = document.querySelector(".sp-account-username");
let profileBalance = document.querySelector(".sp-account-balance");

// CREATE ACCOUNT DOM
let nameInput = document.querySelector("#name-account");
let usernameInput = document.querySelector("#username-account");
let initialBalInput = document.querySelector("#balance-account");
let btnCreateAcc = document.querySelector(".create-account");
let formCreateAcc = document.querySelector(".form-create-account");

// TRANSACTION DOM
let formDeposit = document.querySelector(".deposit-form");
let btnDeposit = document.querySelector(".deposit");
let depositInput = document.querySelector("#deposit");

let formWithdraw = document.querySelector(".withdraw-form");
let btnWithdraw = document.querySelector(".withdraw");
let withdrawInput = document.querySelector("#withdraw");
let withdrawErrorLabel = document.querySelector(".withdraw-error");

let formTransferMoney = document.querySelector(".transfer-money");
let transferAmount = document.querySelector("#transfer-amount");
let recipientName = document.querySelector("#recipient-username");

// CURRENCY FORMATTER
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

console.log(formatter.format(1000));

// -----------------------VAR-----------------------
let activeAccount = "";
let activityDesc = "";

// -----------------------FUNCTIONS----------------------

// ACTIVATE CLICK FUNCTION FOR EACH ROW IN TABLE TO SHOW PROFILE
function clickRowFunc() {
  list_users();
  for (let i = 0; i < usersTableBody.rows.length; i++) {
    // usersTableBody.rows[i].onclick = showProfile;
    usersTableBody.rows[i].addEventListener("click", showProfile);
  }

  formDeposit.reset();
  formTransferMoney.reset();
  formWithdraw.reset();
}

// REDIRECTS TO PROFILE whenever a row is clicked on the table
function showProfile() {
  profileTab.classList.remove("display-none");
  profileTab.classList.add("current");
  homeTab.classList.remove("current");

  console.log(this);
  let username = this.querySelector("td:nth-child(2)").textContent;
  let accounts = JSON.parse(localStorage.getItem("accounts"));
  let index = accounts.findIndex((x) => x.username === username);
  activeAccount = accounts[index].username;
  console.log(activeAccount);

  profileName.textContent = accounts[index].name;
  profileUsername.textContent = accounts[index].username;
  profileBalance.textContent = formatter.format(
    parseInt(accounts[index].balance)
  );

  profilePage.classList.remove("display-none");
  acctsContainer.classList.add("display-none");
  formCreateAcc.classList.add("display-none");

  // -----------------HISTORY TABLE
  showHistoryTable();
}

// SHOW HISTORY TABLE IN ACCOUNTS PROFILE
function showHistoryTable() {
  let accounts = JSON.parse(localStorage.getItem("accounts"));
  let index = accounts.findIndex((x) => x.username === activeAccount);

  document.querySelectorAll(".acct-history tbody tr").forEach(function (e) {
    e.remove();
  });

  if (accounts[index].activities) {
    accounts[index].activities.forEach((acc) => {
      let row = document.createElement("tr");

      Object.values(acc).forEach((text) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        console.log(text);
        // Converts value into currenty to show in table
        if (!isNaN(parseInt(text))) {
          textNode = document.createTextNode(formatter.format(text));
        }

        cell.appendChild(textNode);
        row.appendChild(cell);
      });
      document.querySelector(".acct-history tbody").appendChild(row);
    });
  }
}

// CREATE USER FUNCTION
function create_user() {
  const newUser = {
    name: "",
    username: "",
    balance: 0,
  };
  let accounts;
  let localStorageContent = localStorage.getItem("accounts");

  if (localStorageContent === null) {
    accounts = [];
    console.log(accounts);
  } else {
    accounts = JSON.parse(localStorageContent);
  }

  console.log(localStorage.getItem("accounts"));

  if (
    localStorageContent !== null &&
    accounts.some(function (el) {
      return el.username === usernameInput.value;
    })
  ) {
    document.querySelector(".error").classList.remove("display-none");
    document.querySelector("#username-account").value = "";
    return false;
  } else {
    newUser.name = nameInput.value;
    newUser.username = usernameInput.value;
    newUser.balance = parseInt(initialBalInput.value);

    accounts.unshift(newUser);

    localStorage.setItem("accounts", JSON.stringify(accounts));

    // GOES BACK TO ACCOUNTS TABLE AND CLOSES CREATE ACCOUNT
    formCreateAcc.classList.add("display-none");
    acctsContainer.classList.remove("display-none");
  }
}

// SHOWS USERS AS A TABLE IN ACCOUNTS TABLE
function list_users() {
  //   console.log(
  //     document.querySelector("#users-table td:nth-child(2)").textContent()
  //   );
  // Clears the rows - added to avoid repetition of rows whenever function is called
  document.querySelectorAll("#users-table tbody tr").forEach(function (e) {
    e.remove();
  });

  if (localStorage.getItem("accounts") !== null) {
    JSON.parse(localStorage.getItem("accounts")).forEach((acc) => {
      let row = document.createElement("tr");

      Object.values(acc).forEach((text) => {
        if (typeof text !== "object") {
          let cell = document.createElement("td");
          let textNode = document.createTextNode(text);

          // Converts value into currenty to show in table
          if (!isNaN(parseInt(text))) {
            textNode = document.createTextNode(formatter.format(text));
          }

          cell.appendChild(textNode);
          row.appendChild(cell);
        }
      });
      usersTbody.appendChild(row);
    });
  }
}

// DEPOSIT FUNCTION
function deposit() {
  let localStorageContent = localStorage.getItem("accounts");
  let accounts = JSON.parse(localStorageContent);
  let index = accounts.findIndex((x) => x.username === activeAccount);

  let currentAcc = accounts.filter(function (el) {
    return el.username === activeAccount;
  });

  let newBalance =
    parseInt(accounts[index].balance) + parseInt(depositInput.value);
  accounts[index].balance = newBalance;
  profileBalance.textContent = formatter.format(newBalance);

  // -----------------------------------HISTORY
  const activities = {
    activity: "",
    amount: "",
    remainingBal: 0,
  };

  activityDesc = `Deposit`;
  activities.activity = activityDesc;
  activities.amount = parseInt(depositInput.value);
  activities.remainingBal = newBalance;

  if (!accounts[index].activities) {
    accounts[index].activities = [];
  }

  console.log(accounts[index].activities, activeAccount, activities);
  accounts[index].activities.unshift(activities);

  localStorage.setItem("accounts", JSON.stringify(accounts));

  showHistoryTable();

  // alert(`Successfully deposited ${depositInput.value} to your account`);
  functionAlert(
    `Successfully deposited ${formatter.format(
      depositInput.value
    )} to your account`
  );
}

// WITHDRAW FUNCTION
function withdraw() {
  let localStorageContent = localStorage.getItem("accounts");
  let accounts = JSON.parse(localStorageContent);
  let index = accounts.findIndex((x) => x.username === activeAccount);

  let currentAcc = accounts.filter(function (el) {
    return el.username === activeAccount;
  });

  if (parseInt(withdrawInput.value) > parseInt(accounts[index].balance)) {
    withdrawErrorLabel.classList.remove("display-none");

    functionAlert("Insufficient funds");
  } else {
    withdrawErrorLabel.classList.add("display-none");

    let newBalance =
      parseInt(accounts[index].balance) - parseInt(withdrawInput.value);
    accounts[index].balance = newBalance;
    profileBalance.textContent = formatter.format(newBalance);

    // -----------------------------------HISTORY
    const activities = {
      activity: "",
      amount: "",
      remainingBal: 0,
    };

    activityDesc = `Withdraw`;
    activities.activity = activityDesc;
    activities.amount = parseInt(withdrawInput.value);
    activities.remainingBal = newBalance;

    if (!accounts[index].activities) {
      accounts[index].activities = [];
    }

    accounts[index].activities.unshift(activities);

    console.log(accounts);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    showHistoryTable();

    functionAlert(
      `Successfully withdrew ${formatter.format(
        withdrawInput.value
      )} from your account`
    );
  }
}

function send() {
  let localStorageContent = localStorage.getItem("accounts");
  let accounts = JSON.parse(localStorageContent);
  let indexOfUser = accounts.findIndex((x) => x.username === activeAccount);
  let indexOfRecipient = accounts.findIndex(
    (x) => x.username === recipientName.value
  );

  if (indexOfRecipient === -1) {
    functionAlert(
      "No user exist. Check the spelling of the username and try again."
    );
  } else if (
    parseInt(transferAmount.value) > parseInt(accounts[indexOfUser].balance)
  ) {
    functionAlert("Insufficient funds");
  } else {
    let newBalanceRecipient =
      parseInt(accounts[indexOfRecipient].balance) +
      parseInt(transferAmount.value);
    let newBalanceUser =
      parseInt(accounts[indexOfUser].balance) - parseInt(transferAmount.value);

    accounts[indexOfUser].balance = newBalanceUser;
    accounts[indexOfRecipient].balance = newBalanceRecipient;

    profileBalance.textContent = formatter.format(newBalanceUser);

    // -----------------------------------HISTORY
    const activities = {
      activity: "",
      amount: "",
      remainingBal: 0,
    };

    // FOR SENDER
    activityDesc = `Transferred ${formatter.format(transferAmount.value)} to ${
      accounts[indexOfRecipient].name
    } (${accounts[indexOfRecipient].username})`;
    activities.activity = activityDesc;
    activities.amount = parseInt(transferAmount.value);
    activities.remainingBal = newBalanceUser;

    if (!accounts[indexOfUser].activities) {
      accounts[indexOfUser].activities = [];
    }

    accounts[indexOfUser].activities.unshift(activities);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // FOR RECEIVER
    activityDesc = `Received ${formatter.format(transferAmount.value)} from ${
      accounts[indexOfUser].name
    } (${accounts[indexOfUser].username})`;
    let newActivities = Object.create(activities);
    newActivities.activity = activityDesc;
    newActivities.amount = parseInt(transferAmount.value);
    newActivities.remainingBal = newBalanceRecipient;

    if (!accounts[indexOfRecipient].activities) {
      accounts[indexOfRecipient].activities = [];
    }
    accounts[indexOfRecipient].activities.unshift(newActivities);

    localStorage.setItem("accounts", JSON.stringify(accounts));
    console.log(accounts);

    showHistoryTable();

    functionAlert(
      `Successfully transferred ${formatter.format(transferAmount.value)} to ${
        accounts[indexOfRecipient].name
      } (${accounts[indexOfRecipient].username})`
    );
  }
}

// -----------------------HEADER-----------------------

// LOGIN - logs in based on the credential - use object for creds later
btnLogin.addEventListener("click", function () {
  if (usernameLogin.value === "admin" && passwordLogin.value === "123") {
    loginForm.classList.add("display-none");
    navbar.classList.remove("display-none");
    acctsContainer.classList.remove("display-none");
    list_users();
    for (let i = 0; i < usersTableBody.rows.length; i++) {
      usersTableBody.rows[i].onclick = showProfile;
    }
  } else {
    functionAlert("Invalid username or password");
  }
});

// NEW ACCOUNT BTN - shows create account form
btnNewAcc.addEventListener("click", function () {
  formCreateAcc.classList.remove("display-none");
  acctsContainer.classList.add("display-none");
  profilePage.classList.add("display-none");
  formCreateAcc.reset();
});

// HOME TAB LISTENER
homeTab.addEventListener("click", function () {
  list_users();
  formCreateAcc.classList.add("display-none");
  profilePage.classList.add("display-none");
  profileTab.classList.add("display-none");
  acctsContainer.classList.remove("display-none");
  homeTab.classList.add("current");
  profileTab.classList.remove("current");

  // CLEARING SEARCH INPUT AND REFRESHING USERS TABLE
  searchInput.value = "";
  clickRowFunc();
});

// PROFILE TAB
profileTab.addEventListener("click", function () {
  profileTab.classList.remove("display-none");
  profileTab.classList.add("current");
  homeTab.classList.remove("current");

  profilePage.classList.remove("display-none");
  formCreateAcc.classList.add("display-none");
  acctsContainer.classList.add("display-none");
});

// -----------------------MAIN-----------------------

// userName input lister on  CREATE ACCOUNT - shows error
usernameInput.addEventListener("focus", function () {
  console.log("input");
  document.querySelector(".error").classList.add("display-none");
});

// CREATE ACCOUNT listener - creates new user
formCreateAcc.addEventListener("submit", function () {
  functionAlert("Successfully created new account");
  create_user();
  clickRowFunc();
  // this.classList.add("display-none");
  // acctsContainer.classList.remove("display-none");
});

// ACCOUNTS CONTAINER - SEARCH INPUT (sorting based on name or username)
searchInput.addEventListener("keyup", function (event) {
  const q = event.target.value.toLowerCase();
  document
    .querySelector("#users-table")
    .querySelectorAll("tbody tr")
    .forEach((row) => {
      row.querySelectorAll("td")[0].textContent.toLowerCase().startsWith(q) ||
      row.querySelectorAll("td")[1].textContent.toLowerCase().startsWith(q)
        ? (row.style.display = "table-row")
        : (row.style.display = "none");
    });
});

// ACCOUNTS TRANSACTION
formDeposit.addEventListener("submit", function () {
  deposit();
});

formWithdraw.addEventListener("submit", function () {
  withdraw();
});

formTransferMoney.addEventListener("submit", function () {
  send();
});

// LOGO LISTENER
document.querySelector(".logo").addEventListener("click", function () {
  location.reload();
});
// --------------------CUSTOME ALERT BOX----------------------
function functionAlert(msg, myYes) {
  var confirmBox = $("#confirm");
  confirmBox.find(".message").text(msg);
  confirmBox
    .find(".yes")
    .unbind()
    .click(function () {
      confirmBox.hide();
    });
  confirmBox.find(".yes").click(myYes);
  confirmBox.show();

  setTimeout(() => {
    confirmBox.hide();
  }, 3000);
}
// --------------------------------REFERENCES/OLD CODES----------------------------------

// CLICKING ROWS
// for (let i = 0; i < usersTableBody.rows.length; i++) {
//   usersTableBody.rows[i].onclick = function () {
//     console.log(this);
//   };
//   console.log(usersTableBody);
// }

// ------------REFERENCE
// var accounts = [
//   {
//     name: "Michael Mayers",
//     username: "michaelM",
//     balance: 23000,
//     activities: [
//       {
//         activity: "Transfered money to Tim Gunn",
//         amount: 5000,
//         remainingBalnce: 10000,
//       },
//     ],
//   },
// ];
