require 'test_helper'

class Api::V1::CitiesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_v1_cities_url

    assert_response :success

    json = JSON.parse(response.body)

    assert_kind_of Array, json
    assert_equal City.count, json.length
  end

  test 'should show city' do
    city = cities(1)

    get api_v1_city_url(city)

    assert_response :success

    json = JSON.parse(response.body)

    assert_equal city.id, json['id']
    assert_equal city.name, json['name']
    assert_equal city.population, json['population']
    assert_equal city.state_id, json['state_id']
  end

  test 'should create city' do
    state_id = states(1).id

    assert_difference('City.count', 1) do
      post api_v1_cities_url, params: {
        city: {
          name: 'Blumenau',
          population: 360000,
          state_id: state_id
        }
      }
    end

    assert_response :created

    json = JSON.parse(response.body)

    assert_equal 'Blumenau', json['name']
    assert_equal 360000, json['population']
    assert_equal state_id, json['state_id']
  end

  test 'should not create city without name' do
    state_id = states(1).id

    assert_no_difference('City.count') do
      post api_v1_cities_url, params: {
        city: {
          name: '',
          population: 360000,
          state_id: state_id
        }
      }
    end

    assert_response :unprocessable_entity

    json = JSON.parse(response.body)

    assert_includes json['errors'], "Name can't be blank"
  end

  test 'should update city' do
    city = cities(1)

    patch api_v1_city_url(city), params: {
      city: {
          name: 'Joinville Updated',
          population: 610000,
          state_id: 2
      }
    }

    assert_response :success

    city.reload

    assert_equal 'Joinville Updated', city.name
    assert_equal 610000, city.population

    json = JSON.parse(response.body)

    assert_equal city.id, json['id']
    assert_equal 'Joinville Updated', json['name']
    assert_equal 610000, json['population']
    assert_equal city.state_id, json['state_id']
  end

  test 'should not update city with invalid name' do
    city = cities(1)

    patch api_v1_city_url(city), params: {
      city: {
        name: '',
        population: 610000,
        state_id: 2
      }
    }

    assert_response :unprocessable_entity

    city.reload

    assert_equal 'Joinville', city.name

    json = JSON.parse(response.body)

    assert_includes json['errors'], "Name can't be blank"
  end

  test 'should destroy city' do
    city = cities(1)

    assert_difference('City.count', -1) do
      delete api_v1_city_url(city)
    end

    assert_response :no_content
  end
end
