(function() {

    const Database = require('sf-core/data').Database;
    const Path = require('sf-core/io/path');
    const File = require('sf-core/io/file');


    const database = new Database({
        file: new File({ path: Path.DataDirectory + '/barcode.sqlite' })
    });

    database.execute("CREATE TABLE IF NOT EXISTS basic_info ( 'id' INTEGER PRIMARY KEY AUTOINCREMENT, 'name' TEXT ,'serialNo' TEXT , 'yearOfMaking' TEXT, 'model' TEXT, 'location' TEXT )");
   
    exports.insertData = function() {
        
    
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( 'Laptop','SR34567890','Y2012','Dell XPS 13','Dhaka')");
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( 'Mobile Phone','SR34567890','Y2017','Gionee A1 Plus','India')");
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( 'Laptop','SR34567890','Y2017','HP Spectre 360','Dhaka')");
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( 'Mobile Phone','SR34567890','Y2017','Nokia 8','India')");
        
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( 'Printer','SR7456634','Y2017','Canon Pixma MG5750','Japan')");
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( 'Camera', 'SR56784567','Y2017','Nikon D3400.','England')");
        

        
        var queryResult = database.query("SELECT * FROM basic_info WHERE 1");
        var myDataSet2 = [];
        console.log('queryResult ' + queryResult.count());
        for (var i = 0; i < queryResult.count(); i++) {

            var basic_info = queryResult.get(i);

            myDataSet2.push({
                title: basic_info.getString('name'),
                serialNo: basic_info.getString('serialNo'),
                yearOfMaking: basic_info.getString('yearOfMaking'),
                model: basic_info.getString('model'),
                location: basic_info.getString('location'),
                id: basic_info.getString('id'),
            });
        }
        console.log('data is' + JSON.stringify(myDataSet2));

        return myDataSet2;

    };
    exports.list = function() {

        var queryResult = database.query("SELECT * FROM basic_info WHERE 1");
        var myDataSet = [];
        console.log('queryResult ' + queryResult.count());
        for (var i = 0; i < queryResult.count(); i++) {

            var basic_info = queryResult.get(i);

            myDataSet.push({
                title: basic_info.getString('name'),
                serialNo: basic_info.getString('serialNo'),
                yearOfMaking: basic_info.getString('yearOfMaking'),
                model: basic_info.getString('model'),
                location: basic_info.getString('location'),
                id: basic_info.getString('id'),
            });
        }
        console.log('data is' + JSON.stringify(myDataSet));

        return myDataSet;
    };

    exports.editData = function(cmd) {
        var result = database.execute(cmd);
        return result;

    };



    exports.addData = function(cmd) {
        var result = database.execute(cmd);
        return result;
    };


})();
