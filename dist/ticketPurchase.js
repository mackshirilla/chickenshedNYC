"use strict";(()=>{var p=document.getElementById("submitButton");p&&p.addEventListener("click",I);var i=document.getElementById("needsAssistance");i.addEventListener("change",y);function I(s){s.preventDefault();let g=document.getElementById("needsAssistance"),a={performanceDate:document.getElementById("performanceDate").value,performanceTime:document.getElementById("performanceTime").value,performanceName:document.getElementById("performanceName").value,performanceID:document.getElementById("performanceID").value,successURL:document.getElementById("successURL").value,cancelURL:window.location.href,assistanceMessage:document.getElementById("assistanceMessage").value,checkoutCategory:"ticket",needsAssistance:g.checked?"true":"false",userID:"",sendGridFollowUpID:document.getElementById("sendGridFollowUpID").value,sendGridContactList:document.getElementById("sendGridContactList").value},o=localStorage.getItem("profile");if(o){let e=JSON.parse(o);e&&typeof e.userID=="number"&&(a.userID=e.userID.toString())}let l=[],u=!1;document.querySelectorAll('input[fs-inputcounter-element^="input"]').forEach(e=>{let m=parseInt(e.value);if(m>0){let d=e.getAttribute("priceid");d&&(l.push({price:d,quantity:m}),u=!0)}});let t=document.getElementById("errorMessage");if(t){if(!u){t.textContent="Please select a ticket tier.",t.style.display="block";return}t.style.display="none"}let c=document.getElementById("messageWrapper");c&&(i.checked?c.style.height="12rem":c.style.height="");let r=document.getElementById("loadingWrapper");r&&(r.style.display="block");let f={success_url:a.successURL,cancel_url:a.cancelURL,line_items:l,metadata:{...a,assistanceMessage:a.assistanceMessage||""}},n=new XMLHttpRequest;n.open("POST","https://x8ki-letl-twmt.n7.xano.io/api:lRsgmoHt/sessions"),n.setRequestHeader("Content-Type","application/json"),n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE){if(n.status===200){let e=JSON.parse(n.responseText);e&&e.id?window.location.href=e.url:t&&(t.textContent="Invalid response received from server.",t.style.display="block")}else{let e=JSON.parse(n.responseText);t&&(t.textContent=e.message||"An error occurred.",t.style.display="block")}r&&(r.style.display="none")}},n.send(JSON.stringify(f))}function y(){let s=document.getElementById("messageWrapper");s&&(i.checked?s.style.height="12rem":s.style.height="")}})();
