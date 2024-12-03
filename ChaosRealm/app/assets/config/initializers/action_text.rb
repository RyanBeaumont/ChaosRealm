explain # config/initializers/action_text.rb
Rails.application.config.action_text.default_sanitizer.allowed_tags += ['span']
Rails.application.config.action_text.default_sanitizer.allowed_attributes += ['style']
Rails.application.config.action_text.default_sanitizer.allowed_attributes += ['color']

Rails.application.config.to_prepare do
    ActionText::ContentHelper.allowed_attributes.add 'style'
  end