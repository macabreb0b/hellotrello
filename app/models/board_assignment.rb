# == Schema Information
#
# Table name: board_assignments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class BoardAssignment < ActiveRecord::Base
  
  validates :user, :board, presence: true
  
  belongs_to :user, inverse_of: :board_assignments
  belongs_to :board, inverse_of: :board_assignments
end
