require 'test_helper'

class Api::V1::StatesTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    state_ = states(1)
  
    get "/api/v1/states/#{state_.id}", as: :json

    assert_response :success

    state = JSON.parse(response.body)

    assert_equal state_.id, state['id']
    assert_equal state_.name, state['name']
  end

  test 'should create state' do
    post '/api/v1/states',
      params: {
        state: {
          name: 'São Paulo',
          population: 360000
        }
      },
      as: :json

    assert_response :created

    created_state = JSON.parse(response.body)

    assert_equal 'São Paulo', created_state['name']
    assert_equal 360000, created_state['population']
  end

  test 'should update state' do
    state = states(1)

    patch "/api/v1/states/#{state.id}",
      params: {
        state: {
          name: 'Santa Catarina Update',
          population: 10
        }
      },
      as: :json

    assert_response :success

    updated_state = JSON.parse(response.body)

    assert_equal 'Santa Catarina Update', updated_state['name']
    assert_equal 10, updated_state['population']
  end

  test 'delete' do
    state = states(1)

    delete "/api/v1/states/#{state.id}", as: :json

    assert_response :no_content
  end
end