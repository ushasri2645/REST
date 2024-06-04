## Electricity App

### Problem statement:
There is village with two electricity providers( Electro, Magneto).
Each user will have meter setup at home and user be will be subscribed to a provider for electricity supply.
Each day meters store number of units consumed in a day by hourly basis.
Now your task is to complete tasks defined below in Task # section



### Setup
1. Install dependencies
    ```bash
    npm install
    ```
2. Run app in dev mode
    ```bash
    npm run dev
    ``` 


## Example Usage

Server will running on `http://localhost:3000`

Users

1. get all users
```bash
    req.body.email
```

2. get user by id
```bash
    curl -X GET 'http://localhost:3000/users/1'
```
3. create user
```bash
    curl -X POST -d '{"username":"vinay"}' 'http://localhost:3000/users/1'
```


## Task 1:

1. Fill in the functionality for users APIs defined `src/app.ts`



## Task 2:

```js
const providers = [
    {
        id: 1,
        name: "Electro",
        charge: 5
    },
    {
        id: 2,
        name: "Magneto",
        charge: 10
    },
]
```
1. Create APIs for Providers create, get all, update and delete
provider will
```js
    const provider = { "id" : "provider-name", "charge": 10}
```


## Task 3:

1. Create APIs for user subscribing to providers
`user can choose any one provider`


## Task 4:

1. Create APIs for Meters
Meter will have MeterId, Name, readings

1. API to create meter

```shell
    curl -X GET 'http://localhost:3000/meters'
```

2. API to store meter readings

```shell
    curl -X POST -d '{"units": 5, "time":"2024-05-31T10:00:00.000Z"}' 'http://localhost:3000/meters/1/readings'
```


3. API to get all meter readings

```shell
    curl -X GET 'http://localhost:3000/meters/1/readings'
```



## Task 5
1. A meter will be associated with user i.e., a meter belongs to a user

2. Create an API to return all readings of given user id

3. Create an API to return bill for given user id

bill = total_units * provider_charge

Ex:
user A -> meter A
user A -> Electro
```
readings = [
    { "units":  5, "time": "2024-05-31T10:00:00.000Z" },
    { "units":  7, "time": "2024-05-31T11:00:00.000Z" },
    { "units":  1, "time": "2024-05-31T12:00:00.000Z" }
]

example response: {user_id: 1, amount: 65}


//users data
curl -X POST http://localhost:4000/users -H "Content-Type: application/json" -d '{"userName":"usha","password":"usha1234","email":"usha@gmail.com","fullName":"ushasri"}'

curl -X POST http://localhost:4000/users -H "Content-Type: application/json" -d '{"userName":"Achyu","password":"achy1234","email":"achyu@gmail.com","fullName":"achyuthsai"}'

//providers data

curl -X POST http://localhost:4000/providers -H "Content-Type: application/json" -d '{"name":"Electro","charge":5}'

curl -X POST http://localhost:4000/providers -H "Content-Type: application/json" -d '{"name":"Magneto","charge":10}'

//subcsribe

curl -X POST http://localhost:4000/users/1/subscribe -H "Content-Type: application/json" -d '{"providerId":1}'


//meter create
curl -X POST http://localhost:4000/meters -H "Content-Type: application/json" -d '{"name":"Meter1"}'
//meter update

curl -x PUT http://localhost:4000/meters -H "Content-Type: application/json" -d '{"meterId":1}'
//meter reading
curl -X POST http://localhost:4000/meters/1/readings -H "Content-Type: application/json" -d '{"units": 5, "time":"2024-05-31T10:00:00.000Z"}'
curl -X POST http://localhost:4000/meters/1/readings -H "Content-Type: application/json" -d '{"units": 5, "time":"2024-05-30T10:00:00.000Z"}'

//reading from user
curl -X GET http://localhost:4000/users/1/readings
 
 //get bill
 curl -X GET http://localhost:4000/users/1/bill
