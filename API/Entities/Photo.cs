﻿using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public bool isMain { get; set; }
        public int RecipesId { get; set; }
        public Recipe Recipes { get; set; }


    }
}