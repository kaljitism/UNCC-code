#

### GET 

To request data. 

**Request**: No Body
**Response**: Has Body
**Idempotent**: Yes

### POST 

To create a resource or perform an action

**Request**: Has body
**Response**: Has Body
**Idempotent**: No


### PUT

TO create or fully update

**Request**: Has body
**Response**: May have body
**Idempotent**: Yes


### PATCH

To partially update 

**Request**: Has body
**Response**:  May have body 
**Idempotent**: Not necessarily


### DELETE

To delete a specified body 

**Request**: May have body
**Response**: May have body
**Idempotent**: Yes


### HEADERS

To get the headers only

**Request**: No body
**Response**: No body
**Idempotent**: Yes

### OPTIONS 

To ask for available communication options (methods, CORS, Headers)

**Request**: No Body
**Response**: May have body
**Idempotent**: Yes

