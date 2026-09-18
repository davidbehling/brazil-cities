require 'test_helper'

class Api::V1::CitiesTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    city_ = cities(1)
  
    get "/api/v1/cities/#{city_.id}", as: :json

    assert_response :success

    city = JSON.parse(response.body)

    assert_equal city_.id, city['id']
    assert_equal city_.name, city['name']
  end

  test 'should create city' do
    state = states(1)

    post '/api/v1/cities',
      params: {
        city: {
          name: 'Blumenau',
          population: 360000,
          state_id: state.id
        }
      },
      as: :json

    assert_response :created

    created_city = JSON.parse(response.body)

    assert_equal 'Blumenau', created_city['name']
    assert_equal 360000, created_city['population']
    assert_equal state.id, created_city['state_id']
  end

  test 'should update city' do
    city = cities(1)

    patch "/api/v1/cities/#{city.id}",
      params: {
        city: {
          name: 'Araquari',
          population: 10,
          state_id: 1
        }
      },
      as: :json

    assert_response :success

    updated_city = JSON.parse(response.body)

    assert_equal 'Araquari', updated_city['name']
    assert_equal 10, updated_city['population']
    assert_equal 1, updated_city['state_id']
  end

  test 'delete' do
    city = cities(1)

    delete "/api/v1/cities/#{city.id}", as: :json

    assert_response :no_content
  end
end