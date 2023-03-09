class Cat {
    fields = {
        age: null,
        name: null,

        summary: null,
        details: null
    };

    //constructor() {
    //    //this.name = null;
    //    //this.age = null;
    //    this.summary = null;
    //    this.details = null;
    //}

    initModel(data) {
        //this.name = data.name;
        //this.age = data.age;
        this.summary = data.summary;
        this.details = data.details;
    }

    fill(newFields) {
        for (var field in this.fields) {
            if (this.fields[field] !== 'undefined') {
                this.fields[field] = newFields[field];
            }
        }
    }

    getAge() {
        return this.fields.age;
    }

    setAge(newAge) {
        this.fields.age = newAge;
    }
}

exports.Cat = Cat;