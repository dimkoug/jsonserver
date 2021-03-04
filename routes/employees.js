const { uuid } = require('uuidv4');

const employeesRoutes = (app, fs) => {
  const dataPath = './data/db.json';
  const readFile = (
      callback,
      returnJson = false,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
      });
    };

    const writeFile = (
      fileData,
      callback,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
          throw err;
        }

        callback();
      });
    };

    // READ
    // Notice how we can make this 'read' operation much more simple now.
    app.get('/employees', (req, res) => {
      readFile(data => {
        res.send(data);
      }, true);
    });

    // Create
    app.post('/employees', (req, res) => {
      readFile(data => {
        // Note: this needs to be more robust for production use.
        // e.g. use a UUID or some kind of GUID for a unique ID value.
        employee = {
          "id": uuid(),
          "first_name": req.body.first_name
        }
        data.employees.push(employee);
        console.log(data);

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send('new employee added');
        });
      }, true);
    });

    //update
    app.put('/employees/:id', (req, res) => {
      readFile(data => {
        // add the new employee
        data.employees.some(function(obj){
          if (obj.id === req.params['id']){
            //change the value here
            obj.first_name = req.body.first_name;
            return true;    //breaks out of he loop
        }
      })
      const employeeId = req.params['id'];
      writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`employees id:${employeeId} updated`);
        });
      }, true);
    });


    // DELETE
  app.delete('/employees/:id', (req, res) => {
    readFile(data => {
      // add the new employee
      const removeById = (arr, id) => {
         const requiredIndex = arr.findIndex(el => {
            return el.id === String(id);
         });
         if(requiredIndex === -1){
            return false;
         };
         return !!arr.splice(requiredIndex, 1);
      };
      removeById(data.employees, req.params['id']);
      const employeeId = req.params['id'];
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`employees id:${employeeId} removed`);
      });
    }, true);
  });


  };

module.exports = employeesRoutes;
