# == Schema Information
#
# Table name: card_assignments
#
#  id         :integer          not null, primary key
#  card_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class CardAssignment < ActiveRecord::Base
  
  validates :user, :card, presence: true
  
  belongs_to :user, inverse_of: :card_assignments
  belongs_to :card, inverse_of: :card_assignments
end
