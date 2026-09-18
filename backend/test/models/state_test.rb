require 'test_helper'

class StateTest < ActiveSupport::TestCase
  test 'should be valid with a name' do
    state = State.new(
      name: 'Santa Catarina',
      population: 600_000
    )

    assert state.valid?
  end

  test 'should not be valid without a name' do
    state = State.new(
      population: 600_000
    )

    assert_not state.valid?
    assert_includes state.errors[:name], "can't be blank"
  end
end
