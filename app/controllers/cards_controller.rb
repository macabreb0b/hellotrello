class CardsController < ApplicationController

  def create
    @card = Card.new(card_params)
    parent_list = @card.list
    @card.rank = parent_list.cards.count + 1

    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end

  def show
    @list = List.find(params[:id])
    @cards = @list.cards

  end

  def update
    @card = Card.find(params[:id])
    @card.update_attributes(card_params)

    if params[:newUserEmail]
      email = params[:newUserEmail]
      new_user = User.find_by_email(email)
      new_user && !@card.users.include?(new_user) && @card.users << new_user
    end

    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: nil
  end


  private
  def card_params
    params.require(:card).permit(:title, :description, :rank, :list_id)
  end
end
