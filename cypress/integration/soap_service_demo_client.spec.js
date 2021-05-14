var id_test = 0;
var name_test = 'nemo_rest';
var description_test = 'RestInsert';
describe('Get Courses All Function', () => {
  it('Can get courses all', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/getAllCourse'
    }).then((response) => {
      let result = response.body
      expect(result).to.have.property("data")
      expect(result).to.have.property("status")
      expect(result).to.have.all.keys('status', 'data')
      expect(result.data[0]).to.have.all.keys('id', 'name', 'description')
      expect(response).property("status").to.equal(200);
    })
  })



})
describe('get Courses Function', () => {
  it('Can get courses by id 1', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/getCourse/1',
    }).then((response) => {
      let result = response.body
      expect(result).to.have.property("data")
      expect(result).to.have.property("status")
      expect(result).to.have.all.keys('status', 'data')
      expect(result.data).to.have.all.keys('id', 'name', 'description')
      expect(response).property("status").to.equal(200);
    })
  })

})

describe('Insert Course Function', () => {
  it('Can Insert Course', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/insertCourse',

      body: {
        "name": name_test,
        "description": description_test
      }
    }).then((response) => {
      let result = response.body
      id_test = result.data.id
      expect(result).to.have.property("data")
      expect(result).to.have.property("status")
      expect(result).to.have.all.keys('status', 'data')
      expect(result.data).to.have.all.keys('id', 'name', 'description')
      expect(result.data.name).to.equal(name_test)
      expect(result.data.description).to.equal(description_test)
      expect(response).property("status").to.equal(200);
    })
  })

})

describe('Update Course Function', () => {
  it('Can update course by id', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/updateCourse',

      body: {
        "id": id_test,
        "name": name_test,
        "description": description_test
      }
    }).then((response) => {
      let result = response.body
      expect(result).to.have.property("data")
      expect(result).to.have.property("status")
      expect(result).to.have.all.keys('status', 'data')
      expect(result.data).to.equal("SUCCESS")
      expect(response).property("status").to.equal(200);
    })
  })

})

describe('Delete Course Function', () => {
  it('Can delete course by id', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/removeCourse/'+id_test
    }).then((response) => {
      let result = response.body
      expect(result).to.have.property("data")
      expect(result).to.have.property("status")
      expect(result).to.have.all.keys('status', 'data')
      expect(result.data).to.equal("SUCCESS")
      expect(response).property("status").to.equal(200);
    })
  })

})

