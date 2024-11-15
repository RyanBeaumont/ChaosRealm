class Citizen < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :display_name, presence: true
  
  has_one_attached :profile_picture, dependent: :purge_later
  has_many :forums, dependent: :destroy
  validate :acceptable_image

  private 

  def acceptable_image
    return unless profile_picture.attached?

    unless profile_picture.blob.byte_size <= 1.megabyte
        errors.add(:profile_picture, "is too big")
    end

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(profile_picture.content_type)
        errors.add(:profile_picture, "must be a JPEG or PNG")
    end
  end

end
