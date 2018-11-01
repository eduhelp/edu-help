export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie() {
    var user = getCookie("username");
    return (user != "") ? true : false
}

export function deleteCookie(cname) {
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname+"="+"; "+expires;//Set the cookie with name and the expiration date
 
}

export function changeDateFormat(checkDate) {
    const dt = new Date(checkDate)
    var dd = dt.getDate();
    var mm = dt.getMonth()+1; //January is 0!
    mm = mm < 10 ? '0'+mm : mm
    var yyyy = dt.getFullYear();
    return yyyy + '-' + mm + '-' + dd
}

export function isEmpty (data) {
    return (data === null ||
    data === undefined ||
    (data.hasOwnProperty('length') && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0))
  }

export function getFormatedDate (dt) {
    const month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des' ]
    if (dt) {
      let fdate = new Date(dt)
      var mm = fdate.getMonth()
      var dd = fdate.getDate()
  
      return [
        month[mm], ' ',
        (dd > 9 ? '' : '0') + dd, ', ',
        fdate.getFullYear(),
  
      ].join('')
    } else {
      return ''
    }
}

export function getUserStatus(userStatus, paymentStatus) {
    let currentStatus = ''
    if (userStatus == 'Inactive') {
        if(paymentStatus == 'Pending') {
            currentStatus = 'Inactive - Receiver Confirmation Pending'
        } else {
            currentStatus = 'Inactive - Give Help Pending'
        }
    } else {
        currentStatus = userStatus
    }
    return currentStatus
}

export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

export function ValidateEmail (emailField) {
    var atposition=emailField.indexOf("@");  
    var dotposition=emailField.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=emailField.length){  
        return false;  
    } 
    return true
}

export function sortData (order, orderBy) {
    return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy]
}