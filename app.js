// Validate email
function isEmail(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}

// Load JSON file
function loadJSON(path, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

// Flatten an Array
function flatten(list) {
    return list.reduce(function (a, b) {
        return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, []);
};


// Initilizer method
var PhoneBook = function() {
  // constructor code
  this.contacts = [];
}

PhoneBook.prototype = {
  add: function(contactInfo) {
    if (isEmail(contactInfo['email'])) {
      this.contacts.push(contactInfo);
    } else {
      return 'Sorry enter a valid email.';
    }
  },
  remove: function(index) {
    this.contacts.splice(index, 1);
  },
  search: function(query) {
    query = query.toLowerCase();
    const filterdContacts = this.contacts.map(contact => contact)
      .filter(contact => contact.name.toLowerCase()
                                     .includes(query));
    const phoneQueries = this.contacts.map(contact => contact)
      .filter(contact => contact.phone.includes(query));
      if (phoneQueries) {
        return phoneQueries;
      } else {
        return filterdContacts;
      }
  },
  list: function(contactsPerPage, page) {
    let index = contactsPerPage * page;
    let finish = index + contactsPerPage;
    let display = [];
    if (this.contacts.length < index) {
      return 'sorry contacts is too short to paginate!';
    } else {
      while(index < finish) {
        display.push(this.contacts[index]);
        index++;
      }
    }
    return display;
  }
};

// Hi please run => `python -m SimpleHTTPServer` in your terminal inside the sample dir
// initialize your instance of phonebook by => `new PhoneBook`

var phonebook = new PhoneBook;

loadJSON('./mock-data.json', (data) => {
  data = JSON.parse(data)
  data.forEach(contact => {
    phonebook.add(contact);
  });
});

