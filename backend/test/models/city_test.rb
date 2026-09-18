require 'test_helper'

class CityTest < ActiveSupport::TestCase
  test 'should belong to a state' do
    city = cities(:one)

    assert_respond_to city, :state
    assert_equal states(:one), city.state
  end

  test 'should be valid with a name' do
    city = City.new(
      name: 'Joinville',
      population: 600_000,
      state: states(:one)
    )

    assert city.valid?
  end

  test 'should not be valid without a name' do
    city = City.new(
      population: 600_000,
      state: states(:one)
    )

    assert_not city.valid?
    assert_includes city.errors[:name], "can't be blank"
  end

  test 'search_by_name should find city by prefix' do
    city = City.create!(
      name: 'Joinville',
      population: 600_000,
      state: states(:one)
    )

    results = City.search_by_name('Join')

    assert_includes results, city
  end

  test 'search_by_name should find city by similar name' do
    city = City.create!(
      name: 'Joinville',
      population: 600_000,
      state: states(:one)
    )

    results = City.search_by_name('Joinvile')

    assert_includes results, city
  end

  test 'search_by_state_name should find cities by state name' do
    state = states(:one)

    city = City.create!(
      name: 'Joinville',
      population: 600_000,
      state: state
    )

    results = City.search_by_state_name(state.name)

    assert_includes results, city
  end
end
