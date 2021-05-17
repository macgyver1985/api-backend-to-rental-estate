export default interface ISettings {
  adapters: {
    services: {
      obtainRealEstate: {
        endpoint: string
      }
    }
  },
  application: {
    useCase: {
      authentication: {
        secretkey: string,
        expiresIn: number
      }
    }
  }
}
