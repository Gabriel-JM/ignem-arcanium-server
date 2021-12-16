function makeSut() {
  const findAllTorchRegistriesRepositorySpy = mockfindAllTorchRegistriesRepository()
  const sut = new DbConsumeAllTorchesCharge()

  return {
    sut,
    findAllTorchRegistriesRepositorySpy
  }
}

describe('DbConsumeAllTorchesCharge', () => {
  it('should call FindAllTorchRegistriesRepository', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy } = makeSut()
    
    await sut.consumeAll()

    expect(findAllTorchRegistriesRepositorySpy.findAll).toHaveBeenCalledWith()
  })
})
