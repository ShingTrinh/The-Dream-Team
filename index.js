class Address {
    constructor() {
      this.street = "";
      this.city = "";
      this.state = "";
      this.zipCode = "";
    }
  
    setStreet(street) {
      this.street = street;
    }
  
    setCity(city) {
      this.city = city;
    }
  
    setState(state) {
      this.state = state;
    }
  
    setZipCode(zipCode) {
      this.zipCode = zipCode;
    }
  
    getAddressDetails() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}`;
    }
  }
  
  class Time {
    constructor() {
      this.date = "";
      this.startTime = "";
      this.endTime = "";
    }
  
    setDate(date) {
      this.date = date;
    }
  
    setStartTime(startTime) {
      this.startTime = startTime;
    }
  
    setEndTime(endTime) {
      this.endTime = endTime;
    }
  
    getTimeDetails() {
      return `${this.date} from ${this.startTime} to ${this.endTime}`;
    }
  }
  
  class PersonInfo {
    constructor() {
      this.userId = "";
      this.fname = "";
      this.lname = "";
      this.isEmp = false;
    }
  
    setUserId(userId) {
      this.userId = userId;
    }
  
    getUserId() {
      return this.userId;
    }
  
    setFname(fname) {
      this.fname = fname;
    }
  
    getFname() {
      return this.fname;
    }
  
    setLname(lname) {
      this.lname = lname;
    }
  
    getLname() {
      return this.lname;
    }
  
    setIsEmp(isEmp) {
      this.isEmp = isEmp;
    }
  
    getIsEmp() {
      return this.isEmp;
    }
  }
  
  class RegisteredPerson extends PersonInfo {
    constructor() {
      super();
      this.password = "";
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    getPassword() {
      return this.password;
    }
  }
  
  class EventInfo {
    constructor() {
      this.eventId = "";
      this.eventName = "";
      this.eventType = "";
      this.addressOfEvent = new Address();
      this.timeOfEvent = new Time();
      this.description = "";
    }
  
    setEventId(eventId) {
      this.eventId = eventId;
    }
  
    getEventId() {
      return this.eventId;
    }
  
    setEventName(eventName) {
      this.eventName = eventName;
    }
  
    getEventName() {
      return this.eventName;
    }
  
    setEventType(eventType) {
      this.eventType = eventType;
    }
  
    getEventType() {
      return this.eventType;
    }
  
    setAddressOfEvent(addressOfEvent) {
      this.addressOfEvent = addressOfEvent;
    }
  
    getAddressOfEvent() {
      return this.addressOfEvent;
    }
  
    setTimeOfEvent(timeOfEvent) {
      this.timeOfEvent = timeOfEvent;
    }
  
    getTimeOfEvent() {
      return this.timeOfEvent;
    }
  
    setDescription(description) {
      this.description = description;
    }
  
    getDescription() {
      return this.description;
    }
  }
  
  class Driver {
    constructor() {
      this.quit = false;
      this.list_people = [];
      this.list_events = [];
    }
  
    start() {
      while (!this.quit) {
        const choice = parseInt(prompt("1: Register, 2: Login, 3: Delete account, 4: Add event, 5: Quit"));
        this.handleChoice(choice);
      }
    }
  
    handleChoice(choice) {
      switch (choice) {
        case 1:
          this.register();
          break;
        case 2:
          this.login();
          break;
        case 3:
          this.deleteAccount();
          break;
        case 4:
          this.addEvent();
          break;
        case 5:
          this.quit = true;
          this.quitSystem();
          break;
        default:
          console.log("Invalid choice");
      }
    }
  
    register() {
      const p = new RegisteredPerson();
      p.setUserId(prompt("Enter UserId: "));
      p.setFname(prompt("Enter First Name: "));
      p.setLname(prompt("Enter Last Name: "));
      p.setIsEmp(prompt("Enter true for Employee, false for Customer: "));
  
      const password = prompt("Enter Password: ");
      p.setPassword(password);
  
      this.list_people.push(p);
      console.log("Registration Successful");
    }
  
    login() {
      const userId = prompt("Enter UserId: ");
      const password = prompt("Enter Password: ");
  
      const user = this.list_people.find(person => person.getUserId() === userId);
  
      if (user instanceof RegisteredPerson) {
        if (user.getPassword() === password) {
          console.log("Login Successful");
        } else {
          console.log("Incorrect Password. Login Failed.");
        }
      } else {
        console.log("User not found or not registered. Login Failed.");
      }
    }
  
    deleteAccount() {
      const userId = prompt("Enter UserId: ");
      const password = prompt("Enter Password: ");
  
      const userIndex = this.list_people.findIndex(person => person.getUserId() === userId);
  
      if (userIndex !== -1) {
        const user = this.list_people[userIndex];
  
        if (user instanceof RegisteredPerson && user.getPassword() === password) {
          this.list_people.splice(userIndex, 1);
          console.log("Account Deleted Successfully");
        } else {
          console.log("Incorrect Password. Account Deletion Failed.");
        }
      } else {
        console.log("User not found or not registered. Account Deletion Failed.");
      }
    }
  
    addEvent() {
      const event = new EventInfo();
      event.setEventId(prompt("Enter Event ID: "));
      event.setEventName(prompt("Enter Event Name: "));
      event.setEventType(prompt("Enter Event Type: "));
      
      const address = new Address();
      address.setStreet(prompt("Enter Street: "));
      address.setCity(prompt("Enter City: "));
      address.setState(prompt("Enter State: "));
      address.setZipCode(prompt("Enter Zip Code: "));
      event.setAddressOfEvent(address);
      
      const time = new Time();
      time.setDate(prompt("Enter Date (MM/DD/YYYY): "));
      time.setStartTime(prompt("Enter Start Time: "));
      time.setEndTime(prompt("Enter End Time: "));
      event.setTimeOfEvent(time);
      
      event.setDescription(prompt("Enter Event Description: "));
      
      this.list_events.push(event);
      console.log("Event added successfully");
    }
  
    quitSystem() {
      console.log("Thank you for using the system");
    }
  }
  
  function main() {
      let start = new Driver();
      done = start.start();
  }
  
  
  main();
