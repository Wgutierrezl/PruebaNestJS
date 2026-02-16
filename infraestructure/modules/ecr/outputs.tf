output "repository_url_dev" {
    description = "url to repository dev"
    value = aws_ecr_repository.this_dev.repository_url
}

output "repository_url_prod" {
    description = "url to repository prod"
    value = aws_ecr_repository.this_prod.repository_url
}