require 'rails_helper'

#UNIT tests
RSpec.describe Citizen, type: :model do
  describe 'validations' do
    it 'is invalid without a display_name' do
      citizen = Citizen.new(display_name: nil, email: 'john.doe@example.com', password: 'password123')
      expect(citizen).to_not be_valid
    end

    it 'is valid with a display_name' do
      citizen = Citizen.new(display_name: 'John Doe', email: 'john.doe@example.com', password: 'password123')
      expect(citizen).to be_valid
    end
  end
end

