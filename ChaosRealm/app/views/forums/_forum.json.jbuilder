json.extract! forum, :id, :title, :description, :citizen_id, :created_at, :updated_at
json.url forum_url(forum, format: :json)
