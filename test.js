const domain = 'lee';
function CheckIsValidDomain(domain) { 
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
    return domain.match(re)? true : false;
} 
console.log(CheckIsValidDomain(domain))