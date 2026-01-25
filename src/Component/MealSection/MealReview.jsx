import React from "react";

const MealReview = () => {
  return (
    <div className="p-4">
      <div className="card bg-base-100 max-w-[97%] mx-auto -mt-9">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
           <button
            
                className="btn btn-primary hover:bg-blue-600 "
              >
                Order Now
              </button>
              <button
               
                className="btn btn-primary hover:bg-blue-600 "
              >
                Add Review
              </button>
              <button
                
                className="btn btn-primary hover:bg-blue-600 "
              >
                Add to Favorite
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealReview;
