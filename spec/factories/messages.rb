FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image
    user
    group
  end
end
