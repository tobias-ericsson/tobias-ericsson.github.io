//requires elasticlunr

var search = function () {

    var size = 0;

    var index = elasticlunr(function () {
        this.addField('title');
        this.addField('body');
        this.setRef('id');
    });

    /*
     var doc1 = {
     "id": 1,
     "body": "Yestaday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year."
     }

     var doc2 = {
     "id": 2,
     "body": "As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle's profit of 2015 reached 12.5 Billion."
     }

     index.addDoc(doc1);
     index.addDoc(doc2);
     index.addDoc({"body":"[svtplay](https://www.svtplay.se/)","id": 3});*/

    function search(searchString) {
        return index.search(searchString,
            {
                fields: {
                    title: {boost: 2, bool: "AND"},
                    body: {boost: 1}
                },
                bool: "OR",
                expand: true
            });
    }

    function addDoc(body, title, type, date) {
        let doc = {
            "id": size++,
            "title": title,
            "body": body,
            "type": type,
            "date": date
        };
        index.addDoc(doc);
    }

    return {
        search: search,
        addDoc: addDoc
    }
}();