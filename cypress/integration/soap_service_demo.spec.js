var id_test=0;
var name_test = 'nemokub';
var description_test = 'hihihi';
describe('Get Courses All Function', () => {
  it('Can get courses all', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8082/ws/courses.wsdl',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      body: "<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>" +
        "<Header><Security xmlns='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'><UsernameToken><Username>user</Username><Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>password</Password></UsernameToken></Security>"
        + "</Header>"
        + "<Body>"
        + "<GetAllCourseDetailsRequest xmlns='http://in28minutes.com/courses'/>"
        + "</Body>"
        + "</Envelope>"
    }).then((response) => {
      const xml = Cypress.$.parseXML(response.body)
      const id = xml.getElementsByTagName('ns2:id')
      const name = xml.getElementsByTagName('ns2:name')
      const des = xml.getElementsByTagName('ns2:description')
      for (let i = 0; i < id.length; i++) {
        cy.log(id[i].childNodes[0].nodeValue + " " + name[i].childNodes[0].nodeValue + " " + des[i].childNodes[0].nodeValue)
      }
      expect(id[0].tagName).to.equal('ns2:id')
      expect(name[0].tagName).to.equal('ns2:name')
      expect(des[0].tagName).to.equal('ns2:description')
      expect(response).property("status").to.equal(200);
    })
  })



})
describe('get Courses Function', () => {
  it('Can get courses by id 1', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8082/ws/courses.wsdl',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      body: "<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>" +
        "<Header><Security xmlns='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'><UsernameToken><Username>user</Username><Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>password</Password></UsernameToken></Security>"
        + "</Header>"
        + '<Body>'
        + '<GetCourseDetailsRequest xmlns="http://in28minutes.com/courses">'
        + '<id>1</id>'
        + '</GetCourseDetailsRequest>'
        + '</Body>'
        + '</Envelope>'
    }).then((response) => {
      const xml = Cypress.$.parseXML(response.body)
      const id = xml.getElementsByTagName('ns2:id')
      const name = xml.getElementsByTagName('ns2:name')
      const des = xml.getElementsByTagName('ns2:description')
      for (let i = 0; i < id.length; i++) {
        cy.log(id[i].childNodes[0].nodeValue + " " + name[i].childNodes[0].nodeValue + " " + des[i].childNodes[0].nodeValue)
      }
      expect(id[0].tagName).to.equal('ns2:id')
      expect(name[0].tagName).to.equal('ns2:name')
      expect(des[0].tagName).to.equal('ns2:description')
      expect(response).property("status").to.equal(200);
    })
  })

})

describe('Insert Course Function', () => {
  it('Can Insert Course', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8082/ws/courses.wsdl',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      body: "<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>" +
        "<Header><Security xmlns='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'><UsernameToken><Username>user</Username><Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>password</Password></UsernameToken></Security>"
        + "</Header>"
        + '<Body>'
        + '<InsertCourseDetailsRequest xmlns="http://in28minutes.com/courses">'
        + '<name>' + name_test + '</name>'
        + '<description>' + description_test + '</description>'
        + '</InsertCourseDetailsRequest>'
        + '</Body>'
        + '</Envelope>'
    }).then((response) => {
      const xml = Cypress.$.parseXML(response.body)
      const id = xml.getElementsByTagName('ns2:id')
      const name = xml.getElementsByTagName('ns2:name')
      const des = xml.getElementsByTagName('ns2:description')
      id_test = id[0].childNodes[0].nodeValue;
      expect(name[0].childNodes[0].nodeValue).to.equal(name_test)
      expect(des[0].childNodes[0].nodeValue).to.equal(description_test)

      expect(id[0].tagName).to.equal('ns2:id')
      expect(name[0].tagName).to.equal('ns2:name')
      expect(des[0].tagName).to.equal('ns2:description')
      expect(response).property("status").to.equal(200);
    })
  })

})

describe('Update Course Function', () => {
  it('Can update course by id', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8082/ws/courses.wsdl',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      body: "<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>" +
        "<Header><Security xmlns='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'><UsernameToken><Username>user</Username><Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>password</Password></UsernameToken></Security>"
        + "</Header>"
        + '<Body>'
        + '<UpdateCourseDetailsRequest xmlns="http://in28minutes.com/courses">'
        + '<id>' + id_test + '</id>'
        + '<name>' + name_test + '</name>'
        + '<description>' + description_test + '</description>'
        + '</UpdateCourseDetailsRequest>'
        + '</Body>'
        + '</Envelope>'
    }).then((response) => {
      const xml = Cypress.$.parseXML(response.body)
      const status = xml.getElementsByTagName('ns2:status')

      expect(status[0].childNodes[0].nodeValue).to.equal('SUCCESS')

      expect(status[0].tagName).to.equal('ns2:status')
      expect(response).property("status").to.equal(200);
    })
  })

})

describe('Delete Course Function', () => {
  it('Can delete course by id', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8082/ws/courses.wsdl',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      body: "<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>" +
        "<Header><Security xmlns='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'><UsernameToken><Username>user</Username><Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>password</Password></UsernameToken></Security>"
        + "</Header>"
        + '<Body>'
        + '<DeleteCourseDetailsRequest xmlns="http://in28minutes.com/courses">'
        + '<id>' + id_test + '</id>'
        + '</DeleteCourseDetailsRequest>'
        + '</Body>'
        + '</Envelope>'
    }).then((response) => {
      const xml = Cypress.$.parseXML(response.body)
      const status = xml.getElementsByTagName('ns2:status')

      expect(status[0].childNodes[0].nodeValue).to.equal('SUCCESS')

      expect(status[0].tagName).to.equal('ns2:status')
      expect(response).property("status").to.equal(200);
    })
  })

})

