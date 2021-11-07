"use strict";

//Set focus to true on input text fields
document.querySelector("input[type='text']").focus();

//_______________
//Hide the other job role field unless selected
const jobRole = document.querySelector("#title");
const otherJob = document.querySelector("#other-job-role");

otherJob.style.display = "none";

jobRole.addEventListener("change", () => {
  if (jobRole.value === "other") {
    otherJob.style.display = "block";
  } else {
    otherJob.style.display = "none";
  }
});

//____________________
//Adding conditional options to the t-shirt info section

const designMenu = document.querySelector("#design");
const colorMenu = document.querySelector("#color");
const colorOptions = colorMenu.children;

colorMenu.disabled = true;

designMenu.addEventListener("change", (event) => {
  const target = event.target;
  colorMenu.disabled = false;
  for (let i = 0; i < colorOptions.length; i++) {
    const attribute = colorOptions[i].getAttribute("data-theme");
    if (target.value === attribute) {
      colorOptions[i].disabled = false;
      colorOptions[i].setAttribute("selected", true);
    } else if (target.value !== attribute) {
      colorOptions[i].disabled = true;
      colorOptions[i].removeAttribute("selected", true);
    }
  }
});

//________________________
//Displaying the total cost of selected activites in the respective section.

const activities = document.querySelector("#activities");
const totalDisplay = document.querySelector("#activities-cost");
let total = 0;

activities.addEventListener("change", (e) => {
  const target = e.target;
  const dataCost = parseInt(target.getAttribute("data-cost"));

  if (target.checked) {
    total += dataCost;
  }
  if (!target.checked) {
    total -= dataCost;
  }
  totalDisplay.innerHTML = `Total: $${total}`;
});

//_________________________________________
//Setting the payment systems so that the preferred is displayed, and the rest hidden

const payOptions = document.querySelector("#payment");
const creditOption = document.querySelector("#credit-card");
const payPalOption = document.querySelector("#paypal");
const bitcoinOption = document.querySelector("#bitcoin");

//Disabling Paypal/Bitcoin options as a default beginning option and selecting credit card
payPalOption.style.display = "none";
bitcoinOption.style.display = "none";

payOptions.selectedIndex = 1;

//Display appropriate pay option blocks
payOptions.addEventListener("change", (e) => {
  const target = e.target;
  if (target.value !== "credit-card") {
    if (target.value === "paypal") {
      payPalOption.style.display = "block";
      creditOption.style.display = "none";
      bitcoinOption.style.display = "none";
    } else if (target.value === "bitcoin") {
      bitcoinOption.style.display = "block";
      payPalOption.style.display = "none";
      creditOption.style.display = "none";
    }
  } else {
    payPalOption.style.display = "none";
    bitcoinOption.style.display = "none";
    creditOption.style.display = "block";
  }
});

//__________________
//Form validation to make sure everything is filled out correctly.
//Name has to filled out, email has to be filled out correctly, credit, zip, CVV

//Accessibility notices included when an entry is invalid

const nameField = document.querySelector("#name");
const email = document.querySelector("#email");
const creditCardNo = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const CVV = document.querySelector("#cvv");
const form = document.querySelector("form");
const indActivity = document.querySelectorAll("input[type='checkbox']");
//Adding a warning hint to the activities box since one isn't there
const activityHint = document.createElement("span");
activityHint.innerHTML = "You need to choose at least one activity";
activityHint.style.display = "none";
activityHint.style.color = "red";
activities.append(activityHint);

form.addEventListener("submit", (e) => {
  const nameValue = nameField.value;
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/i.test(nameValue);

  if (!nameIsValid) {
    e.preventDefault();
    nameField.parentNode.classList.add("not-valid");
    nameField.classList.remove("valid");
    document.querySelector("#name-hint").style.display = "block";
  } else if (nameIsValid) {
    nameField.parentNode.classList.remove("not-valid");
    nameField.classList.add("valid");
    document.querySelector("#name-hint").style.display = "none";
  }

  const emailValue = email.value;
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

  if (!emailIsValid) {
    e.preventDefault();
    email.parentNode.classList.add("not-valid");
    email.classList.remove("valid");
    document.querySelector("#email-hint").style.display = "block";
  } else if (emailIsValid) {
    email.parentNode.classList.remove("not-valid");
    email.classList.add("valid");
    document.querySelector("#email-hint").style.display = "none";
  }

  //This small section is to make sure the user has to check AT LEAST ONE activity. I also added a warning snippet at the bottom since there wasn't one yet.
  let checked = false;

  for (let i = 0; i < indActivity.length; i++) {
    if (indActivity[i].checked) {
      checked = true;
      console.log(checked);
      break;
    }
  }

  if (checked === false) {
    e.preventDefault();
    activityHint.style.display = "block";
  }

  if (checked === true) {
    e.preventDefault();
    activityHint.style.display = "none";
  }

  //The remaining section is for credit card and associated values

  if (creditCardNo) {
    const creditCardNoValue = creditCardNo.value;
    let creditCardNoValueNoSpace = creditCardNoValue.replace(/ /g, "").trim();

    /*This regex from https://gist.github.com/hto/060a1d3df81929eedd51799b160b79c8.  FYI - for testing, this won't accept gibberish that is just 13 chars long. Wanted to
  make this as 'real' as possible. I'll likely change the HTML hint to 'make sure this is a valid card later'.
  Also note that this same regext is used again below for real-time error messaging.*/

    const creditIsValid =
      /4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11}$/.test(
        creditCardNoValueNoSpace
      );

    if (!creditIsValid) {
      creditCardNo.parentNode.classList.add("not-valid");
      creditCardNo.classList.remove("valid");
      document.querySelector("#cc-hint").style.display = "block";
    } else if (creditIsValid) {
      creditCardNo.parentNode.classList.remove("not-valid");
      creditCardNo.classList.add("valid");
      document.querySelector("#cc-hint").style.display = "none";
    }

    const zipValue = zip.value;
    const zipIsValid = /^\d{5}$|^\d{5}-\d{4}$/.test(zipValue);

    if (!zipIsValid) {
      zip.parentNode.classList.add("not-valid");
      zip.classList.remove("valid");
      document.querySelector("#zip-hint").style.display = "block";
    } else if (zipIsValid) {
      zip.parentNode.classList.remove("not-valid");
      zip.classList.add("valid");
      document.querySelector("#zip-hint").style.display = "none";
    }

    const cvvValue = CVV.value;
    const cvvIsValid = /^[0-9]{3}$/.test(cvvValue);

    if (!cvvIsValid) {
      CVV.parentNode.classList.add("not-valid");
      CVV.classList.remove("valid");
      document.querySelector("#cvv-hint").style.display = "block";
    } else if (cvvIsValid) {
      CVV.parentNode.classList.remove("not-valid");
      CVV.classList.add("valid");
      document.querySelector("#cvv-hint").style.display = "none";
    }

    if (!cvvIsValid || !zipIsValid || !creditIsValid) {
      e.preventDefault();
    }
  }
});

//-----------
//Accessibility

//identifying individual activities and then will loop over to listen for a focus event
//IndActivity declared higher up in the code - in form validation

for (let i = 0; i < indActivity.length; i++) {
  indActivity[i].addEventListener("focus", () => {
    indActivity[i].parentNode.className += "focus";
  });

  indActivity[i].addEventListener("blur", () => {
    indActivity[i].parentNode.classList.remove("focus");
  });
}

//Preventing users from signing up on activites at the same day/time

for (let i = 0; i < indActivity.length; i++) {
  indActivity[i].addEventListener("click", (e) => {
    let target = e.target;
    let dataTime = target.getAttribute("data-day-and-time");

    if (target.checked) {
      for (let j = 0; j < indActivity.length; j++) {
        let attribute = indActivity[j].getAttribute("data-day-and-time");

        if (attribute === dataTime) {
          indActivity[j].disabled = true;
          indActivity[j].parentNode.classList.add("disabled");
          target.disabled = false;
          target.parentNode.classList.remove("disabled");
        }
      }
    }
    if (!target.checked) {
      for (let j = 0; j < indActivity.length; j++) {
        let attribute = indActivity[j].getAttribute("data-day-and-time");
        if (attribute === dataTime) {
          indActivity[j].disabled = false;
          indActivity[j].parentNode.classList.remove("disabled");
        }
      }
    }
  });
}

//--------
// Providing real time error message

//First in email - create a new span error message to display or hide depending on message
const input = document.createElement("span");
input.innerHTML = "Email must contain an @ symbol";
email.parentNode.append(input);
input.style.display = "none";
input.style.color = "red";

email.addEventListener("keyup", () => {
  const emailValue = email.value;
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

  if (!emailIsValid) {
    if (!emailValue.includes("@")) {
      input.style.display = "block";
    }

    //Removes the error when the user includes the @ symbol
    if (emailValue.includes("@")) {
      input.style.display = "none";
    }

    if (emailIsValid) {
      input.style.display = "none";
    }
  }
});

//Also for credit card to just check that they entered at least a 13-digit number
const inputCredit = document.createElement("span");
inputCredit.innerHTML = "Entry must be at least 13 characters long";

const inputCreditOther = document.createElement("span");
inputCreditOther.innerHTML = "Entries must be in numerical format only";

creditCardNo.parentNode.append(inputCredit);
inputCredit.style.display = "none";
inputCredit.style.color = "red";

creditCardNo.parentNode.append(inputCreditOther);
inputCreditOther.style.display = "none";
inputCreditOther.style.color = "red";

creditCardNo.addEventListener("keyup", () => {
  const creditCardNoValue = creditCardNo.value;
  let creditCardNoValueNoSpace = creditCardNoValue.replace(/ /g, "").trim();

  const creditIsValid =
    /4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11}$/.test(
      creditCardNoValueNoSpace
    );

  const creditContainsLetters = /[A-Za-z]/.test(creditCardNoValueNoSpace);

  if (!creditIsValid) {
    inputCredit.style.display = "none";
    inputCreditOther.style.display = "none";

    if (creditContainsLetters) {
      //This first one is to reset the error so that two errors aren't present at the same time. The character one takes precedence here.
      // inputCredit.style.display = "none";
      inputCreditOther.style.display = "block";
    }
  }

  /*Adding a condition here that only shows up is the other condition isn't met so there aren't two error messages shown .Also adding a length property so that
  if the person includes characters and resets the field, this error doesn't show up immediately on a blank input field */

  if (
    !creditIsValid &&
    creditContainsLetters !== true &&
    creditCardNoValue.length >= 2
  ) {
    inputCreditOther.style.display = "none";
    if (creditCardNoValueNoSpace.indexOf(13) === -1) {
      inputCredit.style.display = "block";
    }
  }
  //Adding this to make sure that the error disappears once they put in the appropriate letters/cases
  if (creditCardNoValueNoSpace.length >= 13) {
    inputCredit.style.display = "none";
  }

  if (creditIsValid) {
    inputCreditOther.style.display = "none";
  }
});
