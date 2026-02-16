resource "aws_ecr_repository" "this_dev" {
    name =  var.ecr_repository_name_dev

    image_scanning_configuration {
      scan_on_push = true
    }
  
}

resource "aws_ecr_repository" "this_prod" {
    name =  var.ecr_repository_name_prod

    image_scanning_configuration {
      scan_on_push = true
    }
  
}