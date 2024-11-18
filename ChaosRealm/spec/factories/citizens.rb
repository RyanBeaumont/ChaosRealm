# spec/factories/citizens.rb
FactoryBot.define do
  factory :citizen do
    display_name { "John Doe" }
    email { "john.doe@example.com" }
    password { "password123" }
    password_confirmation { "password123" }
    
    # Optional: Set other fields as needed for your application
  end
end
  