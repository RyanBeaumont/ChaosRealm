json.extract! post, :id, :text, :created_at, :updated_at
json.url post_url(post, format: :json)
json.text post.text.to_s
