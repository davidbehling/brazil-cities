require 'test_helper'

class Api::V1::StatesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_v1_states_url

    assert_response :success

    json = JSON.parse(response.body)

    assert_kind_of Array, json
    assert_equal State.count, json.length
  end

  test 'should show state' do
    state = states(1)

    get api_v1_state_url(state)

    assert_response :success

    json = JSON.parse(response.body)

    assert_equal state.id, json['id']
    assert_equal state.name, json['name']
    assert_equal state.population, json['population']
  end

  test 'should create state' do
    assert_difference('State.count', 1) do
      post api_v1_states_url, params: {
        state: {
          name: 'São Paulo',
          population: 360000
        }
      }
    end

    assert_response :created

    json = JSON.parse(response.body)

    assert_equal 'São Paulo', json['name']
    assert_equal 360000, json['population']
  end

  test 'should not create state without name' do
    assert_no_difference('State.count') do
      post api_v1_states_url, params: {
        state: {
          name: '',
          population: 360000
        }
      }
    end

    assert_response :unprocessable_entity

    json = JSON.parse(response.body)

    assert_includes json['errors'], "Name can't be blank"
  end

  test 'should update state' do
    state = states(1)

    patch api_v1_state_url(state), params: {
      state: {
          name: 'Santa Catarina Updated',
          population: 610000
      }
    }

    assert_response :success

    state.reload

    assert_equal 'Santa Catarina Updated', state.name
    assert_equal 610000, state.population

    json = JSON.parse(response.body)

    assert_equal state.id, json['id']
    assert_equal 'Santa Catarina Updated', json['name']
    assert_equal 610000, json['population']
  end

  test 'should not update state with invalid name' do
    state = states(1)

    patch api_v1_state_url(state), params: {
      state: {
        name: '',
        population: 610000
      }
    }

    assert_response :unprocessable_entity

    state.reload

    assert_equal 'Santa Catarina', state.name

    json = JSON.parse(response.body)

    assert_includes json['errors'], "Name can't be blank"
  end

  test 'should destroy state' do
    state = states(1)

    assert_difference('State.count', -1) do
      delete api_v1_state_url(state)
    end

    assert_response :no_content
  end
end
