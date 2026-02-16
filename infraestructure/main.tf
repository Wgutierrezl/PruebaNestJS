terraform {
  required_providers {
    aws={
        source = "hashicorp/aws"
    }
  }
}

provider "aws" {
    region = var.aws_region
}

module "ecr" {
    source = "./modules/ecr"
    ecr_repository_name_dev = "nestjs-ecr-dev"
    ecr_repository_name_prod = "nestjs-ecr-prod"
  
}

module "vpc" {
    source = "./modules/vpc"
    vpc_cidr = "10.0.0.0/16"
    public_subnet_cidr = [
        "10.0.1.0/24",
        "10.0.2.0/24",
        "10.0.3.0/24"
    ]
}

module "sg" {
    source = "./modules/sg"
    vpc_id = module.vpc.vpc_id
    port_dev = 3000
    port_prod = 4000
}

module "ecs" {
    source = "./modules/ecs"
    ecs_cluster_name = "nestjs-cluster"
    service_name_dev = "nestjs-service-dev"
    service_name_prod = "nestjs-service-prod"
    task_family_dev = "nestjs-task-dev"
    task_family_prod = "nestjs-task-prod"
    container_image_dev = module.ecr.repository_url_dev
    container_image_prod = module.ecr.repository_url_prod
    container_port_dev = 3000
    container_port_prod = 4000
    subnets_id = module.vpc.subnet_ids
    security_group_id = module.sg.security_group_id
  
}