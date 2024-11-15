require 'rails_helper'

RSpec.describe 'Forum Creation', type: :system do
  let!(:citizen) { FactoryBot.create(:citizen) }

  before do
    sign_in citizen # If using Devise for authentication
  end

  it 'allows a user to create a forum' do
    visit new_forum_path # Visit the 'new forum' page

    fill_in 'Title', with: "Spork's Spoonporium" # Fill in the forum title
    click_button 'Create Forum' # Click the 'Create Forum' button

    save_and_open_page
    # Expectation: After creating, the user should be redirected to the forums page and see the new forum title
    expect(page).to have_content("Spork's Spoonporium") # Ensure the forum title is displayed on the page
  end
end