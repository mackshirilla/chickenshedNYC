"use strict";(()=>{function ne(){let e=localStorage.getItem("authToken");return e?fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/auth/me",{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).catch(t=>{console.error("Error:",t);let a=document.querySelector(".page-wrapper");a&&a.hasAttribute("gatedContent")&&(window.location.href="/login",localStorage.removeItem("authToken"),localStorage.removeItem("profile"),localStorage.removeItem("role"))}):(window.location.href="/login",Promise.reject())}function ae(e){e.addEventListener("change",async()=>{var r;let t=document.getElementById("profileImage"),a=document.getElementById("fileError"),l=document.getElementById("fileUploaded"),c=document.getElementById("loadingImageAnimation"),o=(r=e.files)==null?void 0:r[0];if(o){if(o.size>2*1024*1024){a.textContent="File size must be less than 2MB",a.style.display="block";return}let n=new FileReader;n.onload=async()=>{t.src=n.result,a.textContent="",a.style.display="none",c.style.display="flex";try{let s=localStorage.getItem("studentID"),i=await fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/studentImages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({studentID:s,studentImage:n.result})});if(i.ok)l.style.display="block";else throw new Error(`Error: ${i.status} ${i.statusText}`)}catch(s){a.textContent=s.message,a.style.display="block"}finally{c.style.display="none"}},n.readAsDataURL(o)}else t.src="https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg",a.textContent="",a.style.display="none"})}var h=document.getElementById("firstNameInput"),k=document.getElementById("firstNameError");function U(){return h.hasAttribute("required")&&h.value.trim()===""?(k.textContent="First name required",k.style.display="block",h.classList.add("error"),!1):(k.textContent="",k.style.display="none",h.classList.remove("error"),!0)}h&&h.addEventListener("blur",U);var L=document.getElementById("lastNameInput"),N=document.getElementById("lastNameError");function J(){return L.hasAttribute("required")&&L.value.trim()===""?(N.textContent="Last name required",N.style.display="block",L.classList.add("error"),!1):(N.textContent="",N.style.display="none",L.classList.remove("error"),!0)}L&&L.addEventListener("blur",J);var m=document.getElementById("emailInput"),y=document.getElementById("emailError");function z(){let e=/^\S+@\S+\.\S+$/;return m.hasAttribute("required")&&m.value.trim()===""?(y.textContent="Email is required",y.style.display="block",m.classList.add("error"),!1):m.value.trim()!==""&&!e.test(m.value)?(y.textContent="Please enter a valid email",y.style.display="block",m.classList.add("error"),!1):(y.textContent="",y.style.display="none",m.classList.remove("error"),!0)}m&&m.addEventListener("blur",z);var d=document.getElementById("phoneInput"),g=document.getElementById("phoneError");function se(e){let t=e.replace(/\D/g,"");return t.length===0?"":t.length<4?`(${t}`:t.length<7?`(${t.slice(0,3)}) ${t.slice(3)}`:`(${t.slice(0,3)}) ${t.slice(3,6)}-${t.slice(6,10)}`}function F(){let e=/^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;return d.required&&d.value.trim()===""?(g.textContent="Phone is required",g.style.display="block",d.classList.add("error"),!1):d.value.trim()!==""&&!e.test(d.value)?(g.textContent="Please enter a valid phone number",g.style.display="block",d.classList.add("error"),!1):(d.value=se(d.value),g.textContent="",g.style.display="none",d.classList.remove("error"),!0)}d&&d.addEventListener("input",e=>{let t=e.target;t.value=se(t.value),F()});var v=document.getElementById("dobInput"),S=document.getElementById("dobError");function G(){return v.hasAttribute("required")&&v.value.trim()===""?(S.textContent="Date of Birth is required",S.style.display="block",v.classList.add("error"),!1):(S.textContent="",S.style.display="none",v.classList.remove("error"),!0)}v&&v.addEventListener("blur",G);var T=document.getElementById("genderInput"),w=document.getElementById("genderError");function _(){return T.hasAttribute("required")&&T.value.trim()===""?(w.textContent="Gender is required",w.style.display="block",T.classList.add("error"),!1):(w.textContent="",w.style.display="none",T.classList.remove("error"),!0)}T&&T.addEventListener("blur",_);var b=document.getElementById("schoolInput"),q=document.getElementById("schoolError");function W(){return b.hasAttribute("required")&&b.value.trim()===""?(q.textContent="School name is required",q.style.display="block",b.classList.add("error"),!1):(q.textContent="",q.style.display="none",b.classList.remove("error"),!0)}b&&b.addEventListener("blur",W);var M=document.getElementById("gradeInput"),A=document.getElementById("gradeError");function V(){return M.hasAttribute("required")&&M.value.trim()==="N/A"?(A.textContent="Grade is required",A.style.display="block",M.classList.add("error"),!1):(A.textContent="",A.style.display="none",M.classList.remove("error"),!0)}M&&M.addEventListener("blur",V);var j=document.getElementById("ethnicityInput"),f=document.getElementById("ethnicityError");function Z(){return j.hasAttribute("required")&&j.value.trim()===""?(f.textContent="Ethnicity is required",f.style.display="block",j.classList.add("error"),!1):(f.textContent="",f.style.display="none",f.classList.remove("error"),!0)}f&&j.addEventListener("blur",Z);var H=document.getElementById("healthInput"),P=document.getElementById("healthError");function Q(){return H.hasAttribute("required")&&H.value.trim()===""?(P.textContent="This field is required",P.style.display="block",H.classList.add("error"),!1):(P.textContent="",P.style.display="none",H.classList.remove("error"),!0)}H&&H.addEventListener("blur",Q);var x=document.getElementById("emergencyContact"),O=document.getElementById("emergencyError");function X(){return x.hasAttribute("required")&&x.value.trim()===""?(O.textContent="This field is required",O.style.display="block",x.classList.add("error"),!1):(O.textContent="",O.style.display="none",x.classList.remove("error"),!0)}x&&x.addEventListener("blur",X);var B=document.getElementById("dismissal"),R=document.getElementById("dismissalError");function K(){return B.hasAttribute("required")&&B.value.trim()===""?(R.textContent="This field is required",R.style.display="block",B.classList.add("error"),!1):(R.textContent="",R.style.display="none",B.classList.remove("error"),!0)}B&&B.addEventListener("blur",K);var u=document.getElementById("additionalEmail"),I=document.getElementById("additionalEmailError");function Y(){let e=/^\S+@\S+\.\S+$/;return u.hasAttribute("required")&&u.value.trim()===""?(I.textContent="Email is required",I.style.display="block",u.classList.add("error"),!1):u.value.trim()!==""&&!e.test(u.value)?(I.textContent="Please enter a valid email",I.style.display="block",u.classList.add("error"),!1):(I.textContent="",I.style.display="none",u.classList.remove("error"),!0)}u&&u.addEventListener("blur",Y);var D=document.getElementById("interestInput"),$=document.getElementById("interestError");function Le(){return D.hasAttribute("required")&&D.value.trim()===""?($.textContent="This field is required",$.style.display="block",D.classList.add("error"),!1):($.textContent="",$.style.display="none",D.classList.remove("error"),!0)}D&&D.addEventListener("blur",Le);var He=document.getElementById("bloodType"),xe=document.getElementById("bloodTypeError");async function le(){let e=localStorage.getItem("studentID"),t=localStorage.getItem("profile");if(!t||!e)return;let a=JSON.parse(t),{userID:l}=a,c=document.getElementById("loadingAnimation");c.style.display="block";let o={firstName:document.getElementById("firstNameInput").value,lastName:document.getElementById("lastNameInput").value,email:document.getElementById("emailInput").value,phone:document.getElementById("phoneInput").value,dob:document.getElementById("dobInput").value,gender:document.getElementById("genderInput").value,ethnicity:document.getElementById("ethnicityInput").value,health:document.getElementById("healthInput").value,additionalName:document.getElementById("additionalName").value,additionalEmail:document.getElementById("additionalEmail").value,additionalPhone:document.getElementById("additionalPhone").value,emergencyContact:document.getElementById("emergencyContact").value,dismissal:document.getElementById("dismissal").value,family:document.getElementById("family").value,grade:document.getElementById("gradeInput").value,school:document.getElementById("schoolInput").value,sendTexts:document.getElementById("sendTexts").checked,photoRelease:document.getElementById("photoRelease").checked,independentTravel:document.getElementById("independentTravel").checked,studentID:e,guardianUserID:l};try{let r=await fetch(`https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(r.ok){let n=await r.json(),s=document.getElementById("submitError");s.style.display="none";let i=document.getElementById("successMessage");i.style.display="flex";let E=document.getElementById("addStudentContainer");E.style.display="none",window.scrollTo(0,0);let p=document.getElementById("studentName");p.textContent=`${n.studentProfile.firstName} ${n.studentProfile.lastName}`;let C=document.getElementById("studentEmail");C.textContent=n.studentProfile.email;let ee=document.getElementById("studentPhone");ee.textContent=n.studentProfile.phone;let he=document.getElementById("studentImage");n.studentProfile.image&&n.studentProfile.image.url&&(he.src=n.studentProfile.image.url)}else{let n=await r.json(),s=document.getElementById("submitError");s&&(n.message==="Duplicate record detected. Please check your input and try again."?s.textContent="A user with that email already exists. If your student doesn\u2019t have their own email, please leave blank":s.textContent=n.message||"An error occurred",s.style.display="block",c.style.display="none")}}catch(r){console.error(r)}}ne();function ve(e){function t(i,E){let p=document.getElementById(i);if(p){if(p.tagName==="INPUT"||p.tagName==="TEXTAREA")p.value=E;else if(p.tagName==="SELECT"){let C=Array.from(p.options).find(ee=>ee.value===E);C&&(C.selected=!0)}}}t("firstNameInput",e.firstName),t("lastNameInput",e.lastName),t("phoneInput",e.phone),t("emailInput",e.email),t("dobInput",e.dob),t("schoolInput",e.school),t("gradeInput",e.grade),t("genderInput",e.gender),t("ethnicityInput",e.ethnicity),t("healthInput",e.health),t("emergencyContact",e.emergencyContact),t("dismissal",e.dismissal),["photoRelease","independentTravel","sendTexts"].forEach(i=>{let E=document.getElementById(i);E&&(E.checked=e[i])}),t("family",e.family),t("additionalName",e.additionalName),t("additionalEmail",e.additionalEmail),t("additionalPhone",e.additionalPhone);let l=document.getElementById("studentName");if(l){let i=`${e.firstName} ${e.lastName}`;l.textContent=i}let c=document.getElementById("profileImage");e.image&&e.image.url?c.src=e.image.url:c.src="https://uploads-ssl.webflow.com/64404db37a2b832b7d5aa9f8/64713ce0d5227bcec70c5505_360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg";let o=document.getElementById("additionalCare"),r=document.getElementById("additionalOverflow");o&&r&&(o.checked=!!e.additionalName||!!e.additionalEmail||!!e.additionalPhone,r.style.height=o.checked?"32rem":"0",o.addEventListener("click",()=>{r.style.height=o.checked?"32rem":"0"}));let n=document.getElementById("familyToggle"),s=document.getElementById("familyOverflow");n&&s&&(n.checked=!!e.family,s.style.height=n.checked?"12rem":"0",n.addEventListener("click",()=>{s.style.height=n.checked?"12rem":"0"})),e.id&&localStorage.setItem("studentID",String(e.id))}window.addEventListener("load",()=>{let t=new URLSearchParams(window.location.search).get("student");t?fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/getStudentProfile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({airtableID:t})}).then(l=>l.json()).then(l=>{ve(l)}).catch(l=>{console.error("Error fetching data:",l)}):console.error("Missing airtableID parameter in the URL")});var Te=document.getElementById("imageUpload");ae(Te);var re=document.getElementById("firstNameInput");re&&re.addEventListener("input",U);var ie=document.getElementById("lastNameInput");ie&&ie.addEventListener("input",J);var oe=document.getElementById("emailInput");oe&&oe.addEventListener("input",z);var de=document.getElementById("phoneInput");de&&de.addEventListener("input",F);var me=document.getElementById("dobInput");me&&me.addEventListener("input",G);var ue=document.getElementById("genderInput");ue&&ue.addEventListener("input",_);var ce=document.getElementById("schoolInput");ce&&ce.addEventListener("input",W);var pe=document.getElementById("gradeInput");pe&&pe.addEventListener("input",V);var Ee=document.getElementById("ethnicityInput");Ee&&Ee.addEventListener("input",Z);var ye=document.getElementById("healthInput");ye&&ye.addEventListener("input",Q);var ge=document.getElementById("emergencyContact");ge&&ge.addEventListener("input",X);var Ie=document.getElementById("dismissal");Ie&&Ie.addEventListener("input",K);var fe=document.getElementById("additionalEmail");fe&&fe.addEventListener("input",Y);var te=document.getElementById("submitButton");te==null||te.addEventListener("click",e=>{if(!U()||!J()||!z()||!F()||!G()||!_()||!W()||!V()||!Z()||!Q()||!X()||!K()||!Y()){e.preventDefault();let t=document.getElementById("submitError");t&&(t.style.display="block",t.textContent="Please make sure you have entered all fields correctly.")}else e.preventDefault(),le()});})();
