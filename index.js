/* Your Code Here */
function createEmployeeRecord(recordArr) {
    return {
        firstName: recordArr[0],
        familyName: recordArr[1],
        title: recordArr[2],
        payPerHour: recordArr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}


function createEmployeeRecords(arrOfRecordArr) {
    return arrOfRecordArr.map(recordArr => createEmployeeRecord(recordArr));
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    const timeInObject = {
        type: 'TimeIn',
        hour: +hour,
        date: date,
    }

    this.timeInEvents.push(timeInObject);
    return this;
}


function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    const timeOutObject = {
        type: 'TimeOut',
        hour: +hour,
        date: date,
    }

    this.timeOutEvents.push(timeOutObject);
    return this;
}


function hoursWorkedOnDate(dateNoHour) {
    const timeInHour = this.timeInEvents.find(dateStamp => dateStamp.date === dateNoHour).hour;
    const timeOutHour = this.timeOutEvents.find(dateStamp => dateStamp.date === dateNoHour).hour;

    return ((timeOutHour - timeInHour) / 100);
}

function wagesEarnedOnDate(dateNoHour){
    const wagesOnDate = hoursWorkedOnDate.call(this, dateNoHour)
    return wagesOnDate * this.payPerHour
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(arrOfRecordArr, firstName){
    return arrOfRecordArr.find(arr => arr.firstName === firstName)
}

function calculatePayroll(arrOfRecordArr) {
    return arrOfRecordArr.reduce((ticket, recordArr) => ticket + allWagesFor.call(recordArr), 0)
}

