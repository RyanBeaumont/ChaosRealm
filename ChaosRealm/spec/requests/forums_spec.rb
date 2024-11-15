require 'rails_helper'

#UNIT tests
RSpec.describe Forum, type: :model do
  describe 'validations' do
    it 'is invalid without title' do 
      citizen = FactoryBot.create(:citizen)  # Create a Citizen
      forum = Forum.new(title: nil, citizen: citizen)  # Associate the Citizen with the Forum
      expect(forum).to_not be_valid
    end

    it 'is valid with a title' do 
      citizen = FactoryBot.create(:citizen)  # Create a Citizen
      forum = Forum.new(title: "Spork's Spoonporium", citizen: citizen)  # Associate the Citizen with the Forum
      expect(forum).to be_valid
      puts forum.errors.full_messages
    end

    it 'is invalid without citizen reference' do 
      forum = Forum.new(title: "Spork's Spoonporium", citizen: nil)  # Associate the Citizen with the Forum
      expect(forum).to_not be_valid
    end

  end
end
