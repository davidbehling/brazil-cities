# frozen_string_literal: true

pr = State.create({ name: 'Paraná', population: '11516840' })
sc = State.create({ name: 'Santa Catarina', population: '7609601' })
rs = State.create({ name: 'Rio Grande do Sul', population: '10880506' })

City.create([
  { name: 'Curitiba', population: '3894896', state: pr },
  { name: 'Guarapuava', population: '182093', state: pr },
  { name: 'Londrina', population: '555937', state: pr },
  { name: 'Maringá', population: '409657', state: pr },
  { name: 'Foz do Iguaçu', population: '285415', state: pr },
  { name: 'Florianópolis', population: '1189947', state: sc },
  { name: 'Blumenau', population: '363340', state: sc },
  { name: 'Joinville', population: '616323', state: sc },
  { name: 'Balneário Camboriú', population: '139155', state: sc },
  { name: 'Porto Alegre', population: '1332570', state: rs },
  { name: 'Pelotas', population: '325689', state: rs },
  { name: 'Gramado', population: '44643', state: rs },
  { name: 'Bento Gonçalves', population: '123151', state: rs }
])
