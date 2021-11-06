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
  console.log(target, dataCost);
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
//Accessibility notices included when an entry is invalid

const nameField = document.querySelector("#name");
const email = document.querySelector("#email");
const creditCardNo = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const CVV = document.querySelector("#cvv");
const form = document.querySelector("form");

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

  if (creditCardNo) {
    const creditCardNoValue = creditCardNo.value;
    let creditCardNoValueNoSpace = creditCardNoValue.replace(/ /g, "").trim();

    //This regex from https://gist.github.com/hto/060a1d3df81929eedd51799b160b79c8
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
    const cvvIsValid = /^[0-9]{3,4}$/.test(cvvValue);

    if (!cvvIsValid) {
      CVV.parentNode.classList.add("not-valid");
      CVV.classList.remove("valid");
      document.querySelector("#cvv-hint").style.display = "block";
    } else if (cvvIsValid) {
      CVV.parentNode.classList.remove("not-valid");
      ziCVVp.classList.add("valid");
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
const indActivity = document.querySelectorAll("input[type='checkbox']");
console.log(indActivity);
for (let i = 0; i < indActivity.length; i++) {
  indActivity[i].addEventListener("focus", () => {
    indActivity[i].parentNode.className += "focus";
  });

  indActivity[i].addEventListener("blur", () => {
    indActivity[i].parentNode.classList.remove("focus");
  });
}
